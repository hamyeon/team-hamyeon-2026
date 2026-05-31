package com.vintic.backend.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CalculatePriceRequest(

        @NotBlank(message = "브랜드는 필수입니다.")
        String brand,

        @NotBlank(message = "모델명은 필수입니다.")
        String modelName,

        @NotBlank(message = "컬러웨이는 필수입니다.")
        String color,

        @NotNull(message = "한국 사이즈는 필수입니다.")
        Integer size,

        @NotBlank(message = "상품 상태 등급은 필수입니다.")
        String conditionGrade,

        @NotBlank(message = "구성품 상태는 필수입니다.")
        String componentStatus
) {
}