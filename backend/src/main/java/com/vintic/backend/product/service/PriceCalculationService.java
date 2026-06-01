package com.vintic.backend.product.service;

import com.vintic.backend.product.dto.CalculatePriceRequest;
import com.vintic.backend.product.dto.CalculatePriceResponse;
import com.vintic.backend.product.service.MarketPriceDataLoader.MarketPriceRow;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class PriceCalculationService {

    private static final double KREAM_WEIGHT = 0.7;
    private static final double EBAY_WEIGHT = 0.3;
    private static final double PRICE_RANGE_RATE = 0.05;
    private static final double DEFAULT_CONDITION_RATE = 0.60;
    private static final String UNKNOWN_CONDITION_GRADE = "UNKNOWN";

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
                    0,
                    0,
                    "시세 정보 없음",
                    "입력한 브랜드, 모델명, 색상, 사이즈와 일치하는 KREAM/eBay 시세 데이터를 찾지 못했습니다. 추천 가격 산정을 위해서는 유사 거래 데이터가 추가로 필요합니다.",
                    List.of(),
                    List.of()
            );
        }

        int baseMarketPrice = calculateBaseMarketPrice(kreamAveragePrice, ebayAveragePrice);

        String normalizedConditionGrade = normalizeConditionGrade(request.conditionGrade());
        double conditionRate = getConditionRate(normalizedConditionGrade);
        double componentRate = getComponentRate(request.componentStatus());

        int calculatedPrice = (int) Math.round(baseMarketPrice * conditionRate * componentRate);
        int recommendedPrice = roundToNearestThousand(calculatedPrice);

        int minRecommendedPrice = calculateMinRecommendedPrice(recommendedPrice);
        int maxRecommendedPrice = calculateMaxRecommendedPrice(recommendedPrice);
        String priceRange = makePriceRange(minRecommendedPrice, maxRecommendedPrice);

        String reason = makeReason(
                kreamMatches.size(),
                ebayMatches.size(),
                kreamAveragePrice,
                ebayAveragePrice,
                baseMarketPrice,
                recommendedPrice,
                normalizedConditionGrade,
                conditionRate,
                request.componentStatus(),
                componentRate,
                priceRange
        );

        return new CalculatePriceResponse(
                recommendedPrice,
                baseMarketPrice,
                kreamAveragePrice,
                ebayAveragePrice,
                minRecommendedPrice,
                maxRecommendedPrice,
                priceRange,
                reason,
                toResponseMatches(kreamMatches),
                toResponseMatches(ebayMatches)
        );
    }

    private List<MarketPriceRow> findMatches(List<MarketPriceRow> rows, CalculatePriceRequest request) {
        return rows.stream()
                .filter(row -> equalsIgnoreCase(row.brand(), request.brand()))
                .filter(row -> containsBothWays(row.model(), request.modelName()))
                .filter(row -> containsBothWays(row.colorway(), request.color()))
                .filter(row -> row.sizeKr().equals(request.size()))
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
            return (int) Math.round(kreamAveragePrice * KREAM_WEIGHT + ebayAveragePrice * EBAY_WEIGHT);
        }

        if (kreamAveragePrice > 0) {
            return kreamAveragePrice;
        }

        return ebayAveragePrice;
    }

    private String normalizeConditionGrade(String conditionGrade) {
        if (conditionGrade == null || conditionGrade.isBlank()) {
            return UNKNOWN_CONDITION_GRADE;
        }

        return conditionGrade.trim().toUpperCase();
    }

    private double getConditionRate(String normalizedConditionGrade) {
        return switch (normalizedConditionGrade) {
            case "DS" -> 0.80;
            case "S" -> 0.70;
            case "A" -> 0.60;
            case "B" -> 0.40;
            case "C" -> 0.20;
            default -> DEFAULT_CONDITION_RATE;
        };
    }

    private double getComponentRate(String componentStatus) {
        if (componentStatus == null || componentStatus.isBlank()) {
            return 0.97;
        }

        return switch (componentStatus.trim().toUpperCase()) {
            case "FULL" -> 1.00;
            case "PARTIAL" -> 0.97;
            case "NONE" -> 0.95;
            default -> 0.97;
        };
    }

    private int roundToNearestThousand(int price) {
        return (int) Math.round(price / 1000.0) * 1000;
    }

    private int calculateMinRecommendedPrice(int recommendedPrice) {
        return roundToNearestThousand((int) Math.round(recommendedPrice * (1 - PRICE_RANGE_RATE)));
    }

    private int calculateMaxRecommendedPrice(int recommendedPrice) {
        return roundToNearestThousand((int) Math.round(recommendedPrice * (1 + PRICE_RANGE_RATE)));
    }

    private String makePriceRange(int minRecommendedPrice, int maxRecommendedPrice) {
        return String.format("%,d원 ~ %,d원", minRecommendedPrice, maxRecommendedPrice);
    }

    private String makeReason(
            int kreamCount,
            int ebayCount,
            int kreamAveragePrice,
            int ebayAveragePrice,
            int baseMarketPrice,
            int recommendedPrice,
            String normalizedConditionGrade,
            double conditionRate,
            String componentStatus,
            double componentRate,
            String priceRange
    ) {
        String marketPriceText = makeMarketPriceText(
                kreamCount,
                ebayCount,
                kreamAveragePrice,
                ebayAveragePrice,
                baseMarketPrice
        );

        String conditionText = makeConditionText(normalizedConditionGrade, conditionRate);
        String componentText = makeComponentText(componentStatus, componentRate);
        String comparisonText = makeComparisonText(kreamAveragePrice, ebayAveragePrice, recommendedPrice);

        return String.format(
                "%s %s %s 이를 바탕으로 최종 추천가는 %,d원으로 산정했으며, 판매 권장 범위는 %s입니다. %s",
                marketPriceText,
                conditionText,
                componentText,
                recommendedPrice,
                priceRange,
                comparisonText
        );
    }

    private String makeMarketPriceText(
            int kreamCount,
            int ebayCount,
            int kreamAveragePrice,
            int ebayAveragePrice,
            int baseMarketPrice
    ) {
        if (kreamAveragePrice > 0 && ebayAveragePrice > 0) {
            return String.format(
                    "KREAM 유사 거래 %d건의 평균가 %,d원과 eBay 유사 거래 %d건의 평균가 %,d원을 각각 %.0f%%, %.0f%% 비율로 반영해 기준 시세 %,d원을 계산했습니다.",
                    kreamCount,
                    kreamAveragePrice,
                    ebayCount,
                    ebayAveragePrice,
                    KREAM_WEIGHT * 100,
                    EBAY_WEIGHT * 100,
                    baseMarketPrice
            );
        }

        if (kreamAveragePrice > 0) {
            return String.format(
                    "KREAM 유사 거래 %d건의 평균가 %,d원을 기준 시세로 사용했습니다.",
                    kreamCount,
                    kreamAveragePrice
            );
        }

        return String.format(
                "KREAM 유사 거래는 찾지 못했지만, eBay 유사 거래 %d건의 평균가 %,d원을 기준 시세로 사용했습니다.",
                ebayCount,
                ebayAveragePrice
        );
    }

    private String makeConditionText(String normalizedConditionGrade, double conditionRate) {
        String description = getConditionDescription(normalizedConditionGrade);

        if (UNKNOWN_CONDITION_GRADE.equals(normalizedConditionGrade)) {
            return String.format(
                    "상품 상태 등급이 명확하지 않아 기본 반영률 %.0f%%를 적용했습니다.",
                    conditionRate * 100
            );
        }

        if ("기타 상태".equals(description)) {
            return String.format(
                    "상품 상태 등급 %s는 사전에 정의되지 않은 값이므로 기본 반영률 %.0f%%를 적용했습니다.",
                    normalizedConditionGrade,
                    conditionRate * 100
            );
        }

        return String.format(
                "상품 상태는 %s(%s)로 판단하여 %.0f%% 반영률을 적용했습니다.",
                normalizedConditionGrade,
                description,
                conditionRate * 100
        );
    }

    private String getConditionDescription(String conditionGrade) {
        return switch (conditionGrade) {
            case "DS" -> "새상품";
            case "S" -> "거의 새상품";
            case "A" -> "양호한 중고";
            case "B" -> "사용감 있음";
            case "C" -> "하자 있음";
            default -> "기타 상태";
        };
    }

    private String makeComponentText(String componentStatus, double componentRate) {
        String normalizedStatus = componentStatus == null ? "UNKNOWN" : componentStatus.trim().toUpperCase();

        return switch (normalizedStatus) {
            case "FULL" -> String.format(
                    "구성품이 모두 포함되어 있어 %.0f%% 반영률을 적용했습니다.",
                    componentRate * 100
            );
            case "PARTIAL" -> String.format(
                    "구성품이 일부 포함되어 있어 %.0f%% 반영률을 적용했습니다.",
                    componentRate * 100
            );
            case "NONE" -> String.format(
                    "구성품이 없어 %.0f%% 반영률을 적용했습니다.",
                    componentRate * 100
            );
            default -> String.format(
                    "구성품 상태를 명확히 판단하기 어려워 %.0f%% 반영률을 적용했습니다.",
                    componentRate * 100
            );
        };
    }

    private String makeComparisonText(int kreamAveragePrice, int ebayAveragePrice, int recommendedPrice) {
        if (kreamAveragePrice > 0) {
            return makePriceComparisonText("KREAM 평균가", kreamAveragePrice, recommendedPrice);
        }

        if (ebayAveragePrice > 0) {
            return makePriceComparisonText("eBay 평균가", ebayAveragePrice, recommendedPrice);
        }

        return "";
    }

    private String makePriceComparisonText(String sourceName, int averagePrice, int recommendedPrice) {
        if (averagePrice == 0) {
            return "";
        }

        double differenceRate = ((double) recommendedPrice - averagePrice) / averagePrice * 100;
        int roundedDifferenceRate = (int) Math.round(Math.abs(differenceRate));

        if (roundedDifferenceRate == 0) {
            return String.format(
                    "추천가는 %s와 거의 동일한 수준입니다.",
                    sourceName
            );
        }

        if (differenceRate > 0) {
            return String.format(
                    "추천가는 %s 대비 약 %d%% 높은 수준입니다.",
                    sourceName,
                    roundedDifferenceRate
            );
        }

        return String.format(
                "추천가는 %s 대비 약 %d%% 낮은 수준입니다.",
                sourceName,
                roundedDifferenceRate
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