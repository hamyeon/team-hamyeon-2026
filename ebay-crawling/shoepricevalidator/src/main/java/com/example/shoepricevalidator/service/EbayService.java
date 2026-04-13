package com.example.shoepricevalidator.service;

import com.example.shoepricevalidator.config.EbayProperties;
import com.example.shoepricevalidator.dto.EbayItemDto;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class EbayService {

    private final EbayProperties ebayProperties;
    private final RestClient restClient;
    private final ExchangeRateService exchangeRateService;
    private final KeywordTranslateService keywordTranslateService;

    public EbayService(EbayProperties ebayProperties,
                       ExchangeRateService exchangeRateService,
                       KeywordTranslateService keywordTranslateService) {
        this.ebayProperties = ebayProperties;
        this.exchangeRateService = exchangeRateService;
        this.keywordTranslateService = keywordTranslateService;
        this.restClient = RestClient.builder()
                .baseUrl(ebayProperties.getBaseUrl())
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + ebayProperties.getAccessToken())
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader("X-EBAY-C-MARKETPLACE-ID", ebayProperties.getMarketplaceId())
                .build();
    }

    public List<EbayItemDto> searchItems(String keyword) {
        try {
            Map<String, Object> response = restClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path(ebayProperties.getBrowseSearchPath())
                            .queryParam("q", keyword)
                            .queryParam("limit", 20)
                            .build())
                    .retrieve()
                    .body(Map.class);

            return parseItems(response);

        } catch (HttpStatusCodeException e) {
            System.out.println("=== eBay API ERROR ===");
            System.out.println("status = " + e.getStatusCode());
            System.out.println("body = " + e.getResponseBodyAsString());
            throw e;
        }
    }

    private List<EbayItemDto> parseItems(Map<String, Object> response) {
        List<EbayItemDto> items = new ArrayList<>();
        if (response == null || !response.containsKey("itemSummaries")) {
            return items;
        }

        Object summariesObj = response.get("itemSummaries");
        if (!(summariesObj instanceof List<?> summaries)) {
            return items;
        }

        for (Object obj : summaries) {
            if (!(obj instanceof Map<?, ?> item)) continue;

            String title = item.get("title") != null ? item.get("title").toString() : null;
            String itemWebUrl = item.get("itemWebUrl") != null ? item.get("itemWebUrl").toString() : null;
            String condition = item.get("condition") != null ? item.get("condition").toString() : null;

            Double price = null;
            String currency = null;

            Object priceObj = item.get("price");
            if (priceObj instanceof Map<?, ?> priceMap) {
                Object value = priceMap.get("value");
                Object currencyObj = priceMap.get("currency");

                if (value != null) {
                    try {
                        price = Double.parseDouble(value.toString());
                    } catch (NumberFormatException e) {
                        price = null;
                    }
                }

                if (currencyObj != null) {
                    currency = currencyObj.toString();
                }
            }

            Double priceKrw = null;
            if (price != null && currency != null) {
                Double krwRate = exchangeRateService.getKrwRate(currency);
                if (krwRate != null) {
                    priceKrw = price * krwRate;
                }
            }

            String imageUrl = null;
            Object imageObj = item.get("image");
            if (imageObj instanceof Map<?, ?> imageMap) {
                Object imageValue = imageMap.get("imageUrl");
                if (imageValue != null) {
                    imageUrl = imageValue.toString();
                }
            }

            items.add(new EbayItemDto(
                    title,
                    price,
                    currency,
                    priceKrw,
                    condition,
                    imageUrl,
                    itemWebUrl
            ));
        }

        return items;
    }
}