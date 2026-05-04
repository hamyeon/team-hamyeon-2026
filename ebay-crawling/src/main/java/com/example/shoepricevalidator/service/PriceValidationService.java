package com.example.shoepricevalidator.service;

import com.example.shoepricevalidator.dto.EbayItemDto;
import com.example.shoepricevalidator.dto.PriceResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PriceValidationService {

    private final EbayService ebayService;

    public PriceValidationService(EbayService ebayService) {
        this.ebayService = ebayService;
    }

    public PriceResponseDto validatePrice(String keyword, Double sellerPrice) {
        List<EbayItemDto> items = ebayService.searchItems(keyword);

        List<Double> prices = items.stream()
                .map(EbayItemDto::getPrice)
                .filter(price -> price != null && price > 0)
                .sorted()
                .collect(Collectors.toList());

        if (prices.isEmpty()) {
            return new PriceResponseDto(
                    0.0,
                    0.0,
                    0.0,
                    sellerPrice,
                    0.0,
                    false,
                    0
            );
        }

        double recommendedMin = prices.get(0);
        double recommendedMax = prices.get(prices.size() - 1);
        double estimatedPrice = median(prices);

        double differenceRate = estimatedPrice == 0
                ? 0.0
                : ((sellerPrice - estimatedPrice) / estimatedPrice) * 100.0;

        boolean outlier = Math.abs(differenceRate) >= 30.0;

        return new PriceResponseDto(
                recommendedMin,
                recommendedMax,
                estimatedPrice,
                sellerPrice,
                differenceRate,
                outlier,
                prices.size()
        );
    }

    private double median(List<Double> prices) {
        int size = prices.size();
        if (size % 2 == 1) {
            return prices.get(size / 2);
        }
        return (prices.get(size / 2 - 1) + prices.get(size / 2)) / 2.0;
    }
}