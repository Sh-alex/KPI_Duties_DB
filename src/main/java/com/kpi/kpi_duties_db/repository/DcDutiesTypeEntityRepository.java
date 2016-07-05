package com.kpi.kpi_duties_db.repository;

import com.kpi.kpi_duties_db.domain.DcDutiesTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DcDutiesTypeEntityRepository extends JpaRepository<DcDutiesTypeEntity, Integer> {

    @Query("select b from DcDutiesTypeEntity b where b.name = :name")
    DcDutiesTypeEntity getByName(@Param("name") String name);
}