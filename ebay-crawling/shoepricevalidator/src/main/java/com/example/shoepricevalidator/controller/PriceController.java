package com.example.shoepricevalidator.controller;

import com.example.shoepricevalidator.dto.PriceRequestDto;
import com.example.shoepricevalidator.dto.PriceResponseDto;
import com.example.shoepricevalidator.service.PriceValidationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class PriceController {

    private final PriceValidationService priceValidationService;

    @PostMapping("/api/price/validate")
    public PriceResponseDto validate(@Valid @RequestBody PriceRequestDto requestDto) {
        return priceValidationService.validatePrice(
                requestDto.getKeyword(),
                requestDto.getSellerPrice()
        );
    }
}