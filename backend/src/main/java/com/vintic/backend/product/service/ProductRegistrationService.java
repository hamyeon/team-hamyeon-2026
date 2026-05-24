package com.vintic.backend.product.service;

import com.vintic.backend.product.domain.Product;
import com.vintic.backend.product.dto.CreateProductRequest;
import com.vintic.backend.product.dto.ProductResponse;
import com.vintic.backend.product.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductRegistrationService {

    private final ProductRepository productRepository;

    public ProductRegistrationService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Transactional
    public ProductResponse createProduct(CreateProductRequest request) {
        Product product = new Product(
                request.brand(),
                request.model(),
                request.colorway(),
                request.sizeKr(),
                request.conditionGrade(),
                request.boxIncluded(),
                request.recommendedPrice(),
                request.baseMarketPrice(),
                request.priceRange(),
                request.description()
        );

        Product savedProduct = productRepository.save(product);
        return ProductResponse.from(savedProduct);
    }
}