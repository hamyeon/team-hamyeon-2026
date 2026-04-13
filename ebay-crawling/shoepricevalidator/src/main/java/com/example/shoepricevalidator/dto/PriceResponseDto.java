package com.example.shoepricevalidator.dto;

public class PriceResponseDto {

    private Double recommendedMin;
    private Double recommendedMax;
    private Double estimatedPrice;
    private Double sellerPrice;
    private Double differenceRate;
    private boolean outlier;
    private int sampleCount;

    public PriceResponseDto(Double recommendedMin,
                            Double recommendedMax,
                            Double estimatedPrice,
                            Double sellerPrice,
                            Double differenceRate,
                            boolean outlier,
                            int sampleCount) {
        this.recommendedMin = recommendedMin;
        this.recommendedMax = recommendedMax;
        this.estimatedPrice = estimatedPrice;
        this.sellerPrice = sellerPrice;
        this.differenceRate = differenceRate;
        this.outlier = outlier;
        this.sampleCount = sampleCount;
    }

    public Double getRecommendedMin() {
        return recommendedMin;
    }

    public void setRecommendedMin(Double recommendedMin) {
        this.recommendedMin = recommendedMin;
    }

    public Double getRecommendedMax() {
        return recommendedMax;
    }

    public void setRecommendedMax(Double recommendedMax) {
        this.recommendedMax = recommendedMax;
    }

    public Double getEstimatedPrice() {
        return estimatedPrice;
    }

    public void setEstimatedPrice(Double estimatedPrice) {
        this.estimatedPrice = estimatedPrice;
    }

    public Double getSellerPrice() {
        return sellerPrice;
    }

    public void setSellerPrice(Double sellerPrice) {
        this.sellerPrice = sellerPrice;
    }

    public Double getDifferenceRate() {
        return differenceRate;
    }

    public void setDifferenceRate(Double differenceRate) {
        this.differenceRate = differenceRate;
    }

    public boolean isOutlier() {
        return outlier;
    }

    public void setOutlier(boolean outlier) {
        this.outlier = outlier;
    }

    public int getSampleCount() {
        return sampleCount;
    }

    public void setSampleCount(int sampleCount) {
        this.sampleCount = sampleCount;
    }
}