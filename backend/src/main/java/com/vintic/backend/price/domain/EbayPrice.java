package com.vintic.backend.price.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "ebay_price")
@Getter
@NoArgsConstructor
public class EbayPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "target_id")
    private String targetId;

    private String source;

    private String brand;

    @Column(name = "model_name")
    private String modelName;

    private String colorway;

    @Column(name = "size_kr")
    private Integer sizeKr;

    @Column(name = "size_us")
    private BigDecimal sizeUs;

    @Column(name = "condition_grade")
    private String conditionGrade;

    @Column(name = "box_included")
    private String boxIncluded;

    @Column(name = "ebay_price_krw")
    private Integer ebayPriceKrw;

    private String currency;

    @Column(name = "price_type")
    private String priceType;

    @Column(name = "item_url")
    private String itemUrl;
}