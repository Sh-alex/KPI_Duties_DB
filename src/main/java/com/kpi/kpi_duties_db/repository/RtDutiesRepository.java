package com.kpi.kpi_duties_db.repository;

import com.kpi.kpi_duties_db.domain.RtDutiesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RtDutiesRepository extends JpaRepository<RtDutiesEntity, Integer> {

    @Query("select b from RtDutiesEntity b where b.rtDutiesName = :name")
    RtDutiesEntity getByName(@Param("name") String name);
}