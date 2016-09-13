package com.kpi.kpi_duties_db.repository;

import com.kpi.kpi_duties_db.domain.DcDutiesNameEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Repository
public interface DcDutiesNameRepository extends JpaRepository<DcDutiesNameEntity, Integer> {

    @Query("select b from DcDutiesNameEntity b where b.name = :id")
    DcDutiesNameEntity getById(@Param("id") Integer id);

    @Query("select b from DcDutiesNameEntity b where b.name = :name")
    DcDutiesNameEntity getByName(@Param("name") String name);

}