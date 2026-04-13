package com.example.shoepricevalidator.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PriceRequestDto {

    @NotBlank
    private String keyword;

    private String size;

    private String condition;

    @NotNull
    private Double sellerPrice;
}