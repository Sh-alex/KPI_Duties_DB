package com.kpi.kpi_duties_db.repository;

import com.kpi.kpi_duties_db.domain.dcduties.DcCodeDkhpEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Repository
public interface DcCodeDkhpRepository extends JpaRepository<DcCodeDkhpEntity, Integer> {

    @Query("select e from DcCodeDkhpEntity e where e.name = :name")
    DcCodeDkhpEntity findByName(@Param("name") String name);
}