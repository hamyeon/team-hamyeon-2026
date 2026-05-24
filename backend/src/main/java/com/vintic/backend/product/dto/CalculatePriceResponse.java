package com.vintic.backend.product.dto;

import java.util.List;

public record CalculatePriceResponse(
        int recommendedPrice,
        int baseMarketPrice,
        int kreamAveragePrice,
        int ebayAveragePrice,
        String priceRange,
        String reason,
        List<MatchedMarketPrice> kreamMatches,
        List<MatchedMarketPrice> ebayMatches
) {
    public record MatchedMarketPrice(
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