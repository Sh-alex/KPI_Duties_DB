package com.kpi.kpi_duties_db.repository;

import com.kpi.kpi_duties_db.domain.DcCodeZkpptrEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Repository
public interface DcCodeZkpptrRepository extends JpaRepository<DcCodeZkpptrEntity, Integer> {

    @Query("select e from DcCodeZkpptrEntity e where e.name = :name")
    DcCodeZkpptrEntity findByName(@Param("name") String name);
}