package com.kpi.kpi_duties_db.repository;

import com.kpi.kpi_duties_db.domain.DcCodeZkpptrEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DcCodeZkpptrRepository extends JpaRepository<DcCodeZkpptrEntity, Integer> {

    @Query("select b from DcCodeKpEntity b where b.name = :name")
    DcCodeZkpptrEntity getByName(@Param("name") String name);
}