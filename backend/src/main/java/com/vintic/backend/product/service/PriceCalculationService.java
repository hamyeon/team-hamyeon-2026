package com.vintic.backend.product.service;

import com.vintic.backend.product.dto.CalculatePriceRequest;
import com.vintic.backend.product.dto.CalculatePriceResponse;
import com.vintic.backend.product.service.MarketPriceDataLoader.MarketPriceRow;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class PriceCalculationService {

    private final MarketPriceDataLoader marketPriceDataLoader;

    public PriceCalculationService(MarketPriceDataLoader marketPriceDataLoader) {
        this.marketPriceDataLoader = marketPriceDataLoader;
    }

    public CalculatePriceResponse calculate(CalculatePriceRequest request) {
        List<MarketPriceRow> kreamRows = marketPriceDataLoader.loadKreamRows();
        List<MarketPriceRow> ebayRows = marketPriceDataLoader.loadEbayRows();

        List<MarketPriceRow> kreamMatches = findMatches(kreamRows, request);
        List<MarketPriceRow> ebayMatches = findMatches(ebayRows, request);

        int kreamAveragePrice = calculateAveragePrice(kreamMatches);
        int ebayAveragePrice = calculateAveragePrice(ebayMatches);

        if (kreamAveragePrice == 0 && ebayAveragePrice == 0) {
            return new CalculatePriceResponse(
                    0,
                    0,
                    0,
                    0,
                    "시세 정보 없음",
                    "입력한 브랜드, 모델명, 컬러웨이, 사이즈와 일치하는 KREAM/eBay 시세 데이터를 찾지 못했습니다.",
                    List.of(),
                    List.of()
            );
        }

        int baseMarketPrice = calculateBaseMarketPrice(kreamAveragePrice, ebayAveragePrice);

        double conditionRate = getConditionRate(request.conditionGrade());
        double boxRate = getBoxRate(request.boxIncluded());

        int calculatedPrice = (int) Math.round(baseMarketPrice * conditionRate * boxRate);
        int recommendedPrice = roundToNearestThousand(calculatedPrice);

        String priceRange = makePriceRange(recommendedPrice);

        String reason = makeReason(
                kreamMatches.size(),
                ebayMatches.size(),
                kreamAveragePrice,
                ebayAveragePrice,
                baseMarketPrice,
                request.conditionGrade(),
                request.boxIncluded()
        );

        return new CalculatePriceResponse(
                recommendedPrice,
                baseMarketPrice,
                kreamAveragePrice,
                ebayAveragePrice,
                priceRange,
                reason,
                toResponseMatches(kreamMatches),
                toResponseMatches(ebayMatches)
        );
    }

    private List<MarketPriceRow> findMatches(List<MarketPriceRow> rows, CalculatePriceRequest request) {
        return rows.stream()
                .filter(row -> equalsIgnoreCase(row.brand(), request.brand()))
                .filter(row -> containsBothWays(row.model(), request.model()))
                .filter(row -> containsBothWays(row.colorway(), request.colorway()))
                .filter(row -> row.sizeKr().equals(request.sizeKr()))
                .sorted(Comparator.comparingInt(MarketPriceRow::price))
                .toList();
    }

    private int calculateAveragePrice(List<MarketPriceRow> rows) {
        return (int) Math.round(
                rows.stream()
                        .mapToInt(MarketPriceRow::price)
                        .average()
                        .orElse(0)
        );
    }

    private int calculateBaseMarketPrice(int kreamAveragePrice, int ebayAveragePrice) {
        if (kreamAveragePrice > 0 && ebayAveragePrice > 0) {
            return (int) Math.round(kreamAveragePrice * 0.7 + ebayAveragePrice * 0.3);
        }

        if (kreamAveragePrice > 0) {
            return kreamAveragePrice;
        }

        return ebayAveragePrice;
    }

    private double getConditionRate(String conditionGrade) {
        String grade = conditionGrade.trim().toUpperCase();

        return switch (grade) {
            case "DS" -> 1.00;
            case "S" -> 0.97;
            case "A" -> 0.92;
            case "B" -> 0.82;
            case "C" -> 0.70;
            default -> 0.80;
        };
    }

    private double getBoxRate(Boolean boxIncluded) {
        if (boxIncluded == null) {
            return 0.97;
        }

        return boxIncluded ? 1.00 : 0.95;
    }

    private int roundToNearestThousand(int price) {
        return (int) Math.round(price / 1000.0) * 1000;
    }

    private String makePriceRange(int recommendedPrice) {
        int min = roundToNearestThousand((int) (recommendedPrice * 0.95));
        int max = roundToNearestThousand((int) (recommendedPrice * 1.05));

        return String.format("%,d원 ~ %,d원", min, max);
    }

    private String makeReason(
            int kreamCount,
            int ebayCount,
            int kreamAveragePrice,
            int ebayAveragePrice,
            int baseMarketPrice,
            String conditionGrade,
            Boolean boxIncluded
    ) {
        String boxText;

        if (boxIncluded == null) {
            boxText = "박스 포함 여부 알 수 없음";
        } else if (boxIncluded) {
            boxText = "박스 포함";
        } else {
            boxText = "박스 미포함";
        }

        return String.format(
                "KREAM 유사 거래 %d건의 평균가 %,d원과 eBay 유사 거래 %d건의 평균가 %,d원을 바탕으로 기준 시세 %,d원을 계산했습니다. 이후 상품 상태 %s, %s 조건을 반영해 추천 가격을 산정했습니다.",
                kreamCount,
                kreamAveragePrice,
                ebayCount,
                ebayAveragePrice,
                baseMarketPrice,
                conditionGrade,
                boxText
        );
    }

    private List<CalculatePriceResponse.MatchedMarketPrice> toResponseMatches(List<MarketPriceRow> rows) {
        return rows.stream()
                .limit(5)
                .map(row -> new CalculatePriceResponse.MatchedMarketPrice(
                        row.source(),
                        row.brand(),
                        row.model(),
                        row.colorway(),
                        row.sizeKr(),
                        row.conditionGrade(),
                        row.boxIncluded(),
                        row.price(),
                        row.url()
                ))
                .toList();
    }

    private boolean equalsIgnoreCase(String a, String b) {
        if (a == null || b == null) {
            return false;
        }

        return normalize(a).equals(normalize(b));
    }

    private boolean containsBothWays(String a, String b) {
        if (a == null || b == null) {
            return false;
        }

        String normalizedA = normalize(a);
        String normalizedB = normalize(b);

        return normalizedA.contains(normalizedB) || normalizedB.contains(normalizedA);
    }

    private String normalize(String value) {
        return value
                .trim()
                .toLowerCase()
                .replaceAll("\\s+", "");
    }
}