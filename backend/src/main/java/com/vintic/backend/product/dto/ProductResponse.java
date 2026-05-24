package com.vintic.backend.product.dto;

import com.vintic.backend.product.domain.Product;
import java.time.LocalDateTime;

public record ProductResponse(
        Long id,
        String brand,
        String model,
        String colorway,
        Integer sizeKr,
        String conditionGrade,
        Boolean boxIncluded,
        Integer recommendedPrice,
        Integer baseMarketPrice,
        String priceRange,
        String description,
        LocalDateTime createdAt
) {
    public static ProductResponse from(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getBrand(),
                product.getModel(),
                product.getColorway(),
                product.getSizeKr(),
                product.getConditionGrade(),
                product.getBoxIncluded(),
                product.getRecommendedPrice(),
                product.getBaseMarketPrice(),
                product.getPriceRange(),
                product.getDescription(),
                product.getCreatedAt()
        );
    }
}