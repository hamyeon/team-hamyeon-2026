package com.vintic.backend.product.dto;

import com.vintic.backend.product.domain.Product;
import java.time.LocalDateTime;
import java.util.List;

public record ProductResponse(
        Long id,
        List<String> imageUrls,
        String brand,
        String modelName,
        String color,
        Integer size,
        String conditionGrade,
        String componentStatus,
        Integer recommendedPrice,
        Integer baseMarketPrice,
        String priceRange,
        Integer sellingPrice,
        String reason,
        String sellerDescription,
        LocalDateTime createdAt
) {
    public static ProductResponse from(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getImageUrls(),
                product.getBrand(),
                product.getModel(),
                product.getColorway(),
                product.getSizeKr(),
                product.getConditionGrade(),
                product.getComponentStatus(),
                product.getRecommendedPrice(),
                product.getBaseMarketPrice(),
                product.getPriceRange(),
                product.getFinalPrice(),
                product.getReason(),
                product.getDescription(),
                product.getCreatedAt()
        );
    }
}