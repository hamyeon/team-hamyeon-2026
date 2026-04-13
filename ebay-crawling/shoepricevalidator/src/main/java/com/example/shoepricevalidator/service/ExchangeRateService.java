package com.example.shoepricevalidator.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class ExchangeRateService {

    private final RestClient restClient;

    public ExchangeRateService() {
        this.restClient = RestClient.builder()
                .baseUrl("https://api.frankfurter.dev")
                .build();
    }

    public Double getKrwRate(String baseCurrency) {
        if (baseCurrency == null || baseCurrency.equalsIgnoreCase("KRW")) {
            return 1.0;
        }

        List<Map<String, Object>> response = restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/v2/rates")
                        .queryParam("base", baseCurrency)
                        .queryParam("quotes", "KRW")
                        .build())
                .retrieve()
                .body(List.class);

        if (response == null || response.isEmpty()) {
            return null;
        }

        Object rate = response.get(0).get("rate");
        return rate != null ? Double.parseDouble(rate.toString()) : null;
    }
}