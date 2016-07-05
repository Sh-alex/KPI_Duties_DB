package com.kpi.kpi_duties_db.repository;

import com.kpi.kpi_duties_db.domain.DcCodeEtkdEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DcCodeEtkdEntityRepository extends JpaRepository<DcCodeEtkdEntity, Integer> {

    @Query("select b from DcCodeEtkdEntity b where b.name = :name")
    DcCodeEtkdEntity getByName(@Param("name") String name);
}