package com.kpi.kpi_duties_db.repository;

import com.kpi.kpi_duties_db.domain.DcDutiesPartitionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DcDutiesPartitionEntityRepository extends JpaRepository<DcDutiesPartitionEntity, Integer> {

    @Query("select b from DcDutiesPartitionEntity b where b.dcDutiesPartitionName = :name")
    DcDutiesPartitionEntity findByName(@Param("name") String name);
}

