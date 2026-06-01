package com.vintic.backend.product.dto;

import com.vintic.backend.product.domain.Product;

import java.time.LocalDateTime;

public record ProductListResponse(
        Long id,
        String thumbnailImageUrl,
        String brand,
        String modelName,
        Integer sellingPrice,
        LocalDateTime createdAt
) {
    public static ProductListResponse from(Product product) {
        String thumbnailImageUrl = product.getImageUrls().isEmpty()
                ? null
                : product.getImageUrls().get(0);

        return new ProductListResponse(
                product.getId(),
                thumbnailImageUrl,
                product.getBrand(),
                product.getModel(),
                product.getFinalPrice(),
                product.getCreatedAt()
        );
    }
}