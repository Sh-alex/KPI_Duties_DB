package com.kpi.kpi_duties_db.repository;

import com.kpi.kpi_duties_db.domain.DcDutiesTasksAndResponsibilitiesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Repository
public interface DcDutiesTasksAndResponsibilitiesRepository extends JpaRepository<DcDutiesTasksAndResponsibilitiesEntity, Integer> {

    @Query("select b from DcDutiesTasksAndResponsibilitiesEntity b where b.id = :id")
    DcDutiesTasksAndResponsibilitiesEntity getById(@Param("id") Integer id);

}