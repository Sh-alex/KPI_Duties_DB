package com.kpi.kpi_duties_db.repository;

import com.kpi.kpi_duties_db.domain.DcCodeKpEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DcCodeKpRepository extends JpaRepository<DcCodeKpEntity, Integer> {

    @Query("select b from DcCodeKpEntity b where b.name = :name")
    DcCodeKpEntity getByName(@Param("name") String name);
}