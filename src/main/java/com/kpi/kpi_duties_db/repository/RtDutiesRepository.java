package com.kpi.kpi_duties_db.repository;

import com.kpi.kpi_duties_db.domain.dcduties.RtDutiesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Repository
public interface RtDutiesRepository extends JpaRepository<RtDutiesEntity, Integer> {

    @Query("select e from RtDutiesEntity e where e.name = :name")
    RtDutiesEntity findByName(@Param("name") String name);

}