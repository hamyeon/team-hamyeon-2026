package com.vintic.backend.product.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Component
public class MarketPriceDataLoader {

    private static final String KREAM_CSV_PATH = "data/kream_normalized.csv";
    private static final String EBAY_CSV_PATH = "data/ebay_normalized.csv";

    public List<MarketPriceRow> loadKreamRows() {
        return loadRows(KREAM_CSV_PATH, "KREAM");
    }

    public List<MarketPriceRow> loadEbayRows() {
        return loadRows(EBAY_CSV_PATH, "EBAY");
    }

    private List<MarketPriceRow> loadRows(String path, String source) {
        try {
            ClassPathResource resource = new ClassPathResource(path);

            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8)
            )) {
                String headerLine = reader.readLine();

                if (headerLine == null || headerLine.isBlank()) {
                    return List.of();
                }

                List<String> headers = parseCsvLine(headerLine);
                List<MarketPriceRow> rows = new ArrayList<>();

                String line;
                while ((line = reader.readLine()) != null) {
                    if (line.isBlank()) {
                        continue;
                    }

                    List<String> values = parseCsvLine(line);

                    MarketPriceRow row;
                    if ("KREAM".equals(source)) {
                        row = mapKreamRow(headers, values);
                    } else {
                        row = mapEbayRow(headers, values);
                    }

                    if (row != null) {
                        rows.add(row);
                    }
                }

                return rows;
            }
        } catch (Exception e) {
            throw new IllegalStateException(source + " CSV 파일을 읽는 중 오류가 발생했습니다.", e);
        }
    }

    private MarketPriceRow mapKreamRow(List<String> headers, List<String> values) {
        String brand = getValue(headers, values, "브랜드");
        String model = getValue(headers, values, "모델명");
        String colorway = getValue(headers, values, "컬러웨이");
        String sizeKrText = getValue(headers, values, "한국 사이즈");
        String priceText = getValue(headers, values, "KREAM 가격");
        String conditionGrade = getValue(headers, values, "상태");
        String url = getValue(headers, values, "상품 URL");

        Integer sizeKr = parseInteger(sizeKrText);
        Integer price = parseInteger(priceText);

        if (isBlank(brand) || isBlank(model) || isBlank(colorway) || sizeKr == null || price == null) {
            return null;
        }

        return new MarketPriceRow(
                "KREAM",
                brand,
                model,
                colorway,
                sizeKr,
                conditionGrade,
                null,
                price,
                url
        );
    }

    private MarketPriceRow mapEbayRow(List<String> headers, List<String> values) {
        String brand = getValue(headers, values, "brand");
        String model = getValue(headers, values, "model");
        String colorway = getValue(headers, values, "colorway");
        String sizeKrText = getValue(headers, values, "size_kr");
        String priceText = getValue(headers, values, "ebay_price_krw");
        String conditionGrade = getValue(headers, values, "condition_grade");
        String boxIncludedText = getValue(headers, values, "box_included");
        String url = getValue(headers, values, "item_url");

        Integer sizeKr = parseInteger(sizeKrText);
        Integer price = parseInteger(priceText);
        Boolean boxIncluded = parseBoolean(boxIncludedText);

        if (isBlank(brand) || isBlank(model) || isBlank(colorway) || sizeKr == null || price == null) {
            return null;
        }

        return new MarketPriceRow(
                "EBAY",
                brand,
                model,
                colorway,
                sizeKr,
                conditionGrade,
                boxIncluded,
                price,
                url
        );
    }

    private String getValue(List<String> headers, List<String> values, String columnName) {
        for (int i = 0; i < headers.size(); i++) {
            if (headers.get(i).trim().equals(columnName)) {
                if (i < values.size()) {
                    return values.get(i).trim();
                }
                return null;
            }
        }

        return null;
    }

    private Integer parseInteger(String value) {
        try {
            if (isBlank(value)) {
                return null;
            }

            String onlyNumber = value.replaceAll("[^0-9]", "");

            if (onlyNumber.isBlank()) {
                return null;
            }

            return Integer.parseInt(onlyNumber);
        } catch (Exception e) {
            return null;
        }
    }

    private Boolean parseBoolean(String value) {
        if (isBlank(value)) {
            return null;
        }

        String normalized = value.trim().toLowerCase();

        if ("true".equals(normalized)) {
            return true;
        }

        if ("false".equals(normalized)) {
            return false;
        }

        return null;
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    private List<String> parseCsvLine(String line) {
        List<String> result = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        boolean inQuotes = false;

        for (int i = 0; i < line.length(); i++) {
            char ch = line.charAt(i);

            if (ch == '"') {
                inQuotes = !inQuotes;
            } else if (ch == ',' && !inQuotes) {
                result.add(current.toString());
                current.setLength(0);
            } else {
                current.append(ch);
            }
        }

        result.add(current.toString());
        return result;
    }

    public record MarketPriceRow(
            String source,
            String brand,
            String model,
            String colorway,
            Integer sizeKr,
            String conditionGrade,
            Boolean boxIncluded,
            int price,
            String url
    ) {
    }
}