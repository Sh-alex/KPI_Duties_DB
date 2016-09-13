package com.kpi.kpi_duties_db.repository;

import com.kpi.kpi_duties_db.domain.DcDutiesQualificationRequirementsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Repository
public interface DcDutiesQualificationRequirementsRepository extends JpaRepository<DcDutiesQualificationRequirementsEntity, Integer> {

    @Query("select b from DcDutiesQualificationRequirementsEntity b where b.id = :id")
    DcDutiesQualificationRequirementsEntity getById(@Param("id") Integer id);
}