package com.kpi.kpi_duties_db.repository;

import com.kpi.kpi_duties_db.domain.DcDutiesNameEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DcDutiesNameRepository extends JpaRepository<DcDutiesNameEntity, Integer> {

    @Query("select b from DcDutiesNameEntity b where b.name = :name")
    DcDutiesNameEntity getByName(@Param("name") String name);

}