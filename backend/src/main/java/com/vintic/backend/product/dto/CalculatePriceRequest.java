package com.vintic.backend.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CalculatePriceRequest(

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
        Boolean boxIncluded
) {
}