package com.vintic.backend.product;

import com.vintic.backend.product.dto.CalculatePriceRequest;
import com.vintic.backend.product.dto.CalculatePriceResponse;
import com.vintic.backend.product.service.PriceCalculationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final PriceCalculationService priceCalculationService;

    public ProductController(PriceCalculationService priceCalculationService) {
        this.priceCalculationService = priceCalculationService;
    }

    
    @PostMapping("/calculate-price")
    public ResponseEntity<CalculatePriceResponse> calculatePrice(
            @Valid @RequestBody CalculatePriceRequest request
    ) {
        CalculatePriceResponse response = priceCalculationService.calculate(request);
        return ResponseEntity.ok(response);
    }
}