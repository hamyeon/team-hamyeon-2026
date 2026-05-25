package com.vintic.backend.price.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "kream_price")
@Getter
@NoArgsConstructor
public class KreamPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "target_id")
    private String targetId;

    private String brand;

    @Column(name = "model_name")
    private String modelName;

    private String colorway;

    @Column(name = "size_kr")
    private Integer sizeKr;

    @Column(name = "kream_price_krw")
    private Integer kreamPriceKrw;

    @Column(name = "price_type")
    private String priceType;

    @Column(name = "product_url")
    private String productUrl;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "collected_date")
    private java.time.LocalDate collectedDate;

    @Column(name = "condition_grade")
    private String conditionGrade;

    private String memo;
}