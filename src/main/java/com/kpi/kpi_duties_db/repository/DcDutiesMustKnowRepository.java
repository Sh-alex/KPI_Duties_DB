package com.kpi.kpi_duties_db.repository;

import com.kpi.kpi_duties_db.domain.DcDutiesMustKnowEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Repository
public interface DcDutiesMustKnowRepository extends JpaRepository<DcDutiesMustKnowEntity, Integer> {

    @Query("select b from DcCodeKpEntity b where b.name = :name")
    DcDutiesMustKnowEntity getByName(@Param("name") String name);
}