package com.vintic.backend.price.service;

import com.vintic.backend.price.repository.EbayPriceRepository;
import com.vintic.backend.price.repository.KreamPriceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MarketPriceService {

    private final KreamPriceRepository kreamPriceRepository;
    private final EbayPriceRepository ebayPriceRepository;

    public Integer getKreamAveragePrice(String brand, String modelName, Integer sizeKr) {
        Double averagePrice = kreamPriceRepository.findAveragePriceByBrandAndModelNameAndSizeKr(
                brand,
                modelName,
                sizeKr
        );

        if (averagePrice == null) {
            return null;
        }

        return averagePrice.intValue();
    }

    public Integer getEbayAveragePrice(String brand, String modelName, Integer sizeKr) {
        Double averagePrice = ebayPriceRepository.findAveragePriceByBrandAndModelNameAndSizeKr(
                brand,
                modelName,
                sizeKr
        );

        if (averagePrice == null) {
            return null;
        }

        return averagePrice.intValue();
    }
}