package com.vintic.backend.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record CreateProductRequest(

        @NotNull(message = "이미지 URL은 필수입니다.")
        @Size(min = 3, max = 4, message = "이미지 URL은 최소 3개, 최대 4개까지 등록할 수 있습니다.")
        List<@NotBlank(message = "이미지 URL은 비어 있을 수 없습니다.") String> imageUrls,

        @NotBlank(message = "브랜드는 필수입니다.")
        String brand,

        @NotBlank(message = "모델명은 필수입니다.")
        String modelName,

        @NotBlank(message = "색상은 필수입니다.")
        String color,

        @NotNull(message = "한국 사이즈는 필수입니다.")
        Integer size,

        @NotBlank(message = "상품 상태 등급은 필수입니다.")
        String conditionGrade,

        @NotBlank(message = "구성품 상태는 필수입니다.")
        String componentStatus,

        @NotNull(message = "추천 가격은 필수입니다.")
        Integer recommendedPrice,

        Integer baseMarketPrice,

        String priceRange,

        @NotNull(message = "최종 판매 가격은 필수입니다.")
        Integer sellingPrice,

        String reason,

        String sellerDescription
) {
}