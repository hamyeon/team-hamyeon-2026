package com.vintic.backend.price.repository;

import com.vintic.backend.price.domain.KreamPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface KreamPriceRepository extends JpaRepository<KreamPrice, Long> {

    @Query("""
        SELECT AVG(k.kreamPriceKrw)
        FROM KreamPrice k
        WHERE k.brand = :brand
          AND k.modelName = :modelName
          AND k.sizeKr = :sizeKr
    """)
    Double findAveragePriceByBrandAndModelNameAndSizeKr(
            @Param("brand") String brand,
            @Param("modelName") String modelName,
            @Param("sizeKr") Integer sizeKr
    );
}