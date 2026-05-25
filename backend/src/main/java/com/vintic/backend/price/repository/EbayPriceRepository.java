package com.vintic.backend.price.repository;

import com.vintic.backend.price.domain.EbayPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EbayPriceRepository extends JpaRepository<EbayPrice, Long> {

    @Query("""
        SELECT AVG(e.ebayPriceKrw)
        FROM EbayPrice e
        WHERE e.brand = :brand
          AND e.modelName = :modelName
          AND e.sizeKr = :sizeKr
    """)
    Double findAveragePriceByBrandAndModelNameAndSizeKr(
            @Param("brand") String brand,
            @Param("modelName") String modelName,
            @Param("sizeKr") Integer sizeKr
    );
}