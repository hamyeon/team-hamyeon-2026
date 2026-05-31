package com.vintic.backend.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record CreateProductRequest(

        @NotEmpty(message = "이미지 URL은 최소 3개 이상 필요합니다.")
        @Size(min = 3, max = 4, message = "이미지 URL은 최소 3개, 최대 4개까지 등록할 수 있습니다.")
        List<@NotBlank(message = "이미지 URL은 비어 있을 수 없습니다.") String> imageUrls,

        @NotBlank(message = "브랜드는 필수입니다.")
        String brand,

        @NotBlank(message = "모델명은 필수입니다.")
        String model,

        @NotBlank(message = "컬러웨이는 필수입니다.")
        String colorway,

        @NotNull(message = "한국 사이즈는 필수입니다.")
        Integer sizeKr,

        @NotBlank(message = "상품 상태 등급은 필수입니다.")
        String conditionGrade,

        @NotNull(message = "박스 포함 여부는 필수입니다.")
        Boolean boxIncluded,

        @NotNull(message = "추천 가격은 필수입니다.")
        Integer recommendedPrice,

        Integer baseMarketPrice,

        String priceRange,

        @NotNull(message = "최종 판매 가격은 필수입니다.")
        Integer finalPrice,

        String reason,

        String description
) {
}