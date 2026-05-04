package com.example.shoepricevalidator.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "ebay")
public class EbayProperties {

    private String baseUrl;
    private String browseSearchPath;
    private String accessToken;
    private String marketplaceId;

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public String getBrowseSearchPath() {
        return browseSearchPath;
    }

    public void setBrowseSearchPath(String browseSearchPath) {
        this.browseSearchPath = browseSearchPath;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getMarketplaceId() {
        return marketplaceId;
    }

    public void setMarketplaceId(String marketplaceId) {
        this.marketplaceId = marketplaceId;
    }
}