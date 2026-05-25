package com.vintic.backend.product;

import com.vintic.backend.common.dto.ApiResponse;
import com.vintic.backend.product.dto.CalculatePriceRequest;
import com.vintic.backend.product.dto.CalculatePriceResponse;
import com.vintic.backend.product.dto.CreateProductRequest;
import com.vintic.backend.product.dto.ProductResponse;
import com.vintic.backend.product.service.PriceCalculationService;
import com.vintic.backend.product.service.ProductRegistrationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final PriceCalculationService priceCalculationService;
    private final ProductRegistrationService productRegistrationService;

    public ProductController(
            PriceCalculationService priceCalculationService,
            ProductRegistrationService productRegistrationService
    ) {
        this.priceCalculationService = priceCalculationService;
        this.productRegistrationService = productRegistrationService;
    }

    @PostMapping("/calculate-price")
    public ResponseEntity<ApiResponse<CalculatePriceResponse>> calculatePrice(
            @Valid @RequestBody CalculatePriceRequest request
    ) {
        CalculatePriceResponse response = priceCalculationService.calculate(request);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponse>> createProduct(
            @Valid @RequestBody CreateProductRequest request
    ) {
        ProductResponse response = productRegistrationService.createProduct(request);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}