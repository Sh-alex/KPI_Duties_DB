package com.kpi.kpi_duties_db.repository;

import com.kpi.kpi_duties_db.domain.dcduties.DcCodeKpEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Repository
public interface DcCodeKpRepository extends JpaRepository<DcCodeKpEntity, Integer> {

    @Query("select e from DcCodeKpEntity e where e.name = :name")
    DcCodeKpEntity findByName(@Param("name") String name);
}