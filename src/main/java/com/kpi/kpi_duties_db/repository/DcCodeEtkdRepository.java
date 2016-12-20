package com.kpi.kpi_duties_db.repository;

import com.kpi.kpi_duties_db.domain.DcCodeEtkdEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Repository
public interface DcCodeEtkdRepository extends JpaRepository<DcCodeEtkdEntity, Integer> {

    @Query("select e from DcCodeEtkdEntity e where e.name = :name")
    DcCodeEtkdEntity findByName(@Param("name") String name);
}