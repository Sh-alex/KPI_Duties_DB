package com.kpi.kpi_duties_db.repository;

import com.kpi.kpi_duties_db.domain.DcDutiesPartitionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Repository
public interface DcDutiesPartitionRepository extends JpaRepository<DcDutiesPartitionEntity, Integer> {

    @Query("select b from DcDutiesPartitionEntity b where b.dcDutiesPartitionName = :name")
    DcDutiesPartitionEntity getByName(@Param("name") String name);
}