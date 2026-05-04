package com.example.shoepricevalidator.dto;

public class EbayItemDto {

    private String title;
    private Double price;
    private String currency;
    private Double priceKrw;
    private String condition;
    private String imageUrl;
    private String itemWebUrl;

    public EbayItemDto(String title, Double price, String currency, Double priceKrw,
                       String condition, String imageUrl, String itemWebUrl) {
        this.title = title;
        this.price = price;
        this.currency = currency;
        this.priceKrw = priceKrw;
        this.condition = condition;
        this.imageUrl = imageUrl;
        this.itemWebUrl = itemWebUrl;
    }

    public String getTitle() {
        return title;
    }

    public Double getPrice() {
        return price;
    }

    public String getCurrency() {
        return currency;
    }

    public Double getPriceKrw() {
        return priceKrw;
    }

    public String getCondition() {
        return condition;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getItemWebUrl() {
        return itemWebUrl;
    }
}