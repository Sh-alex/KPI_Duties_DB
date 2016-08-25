package com.kpi.kpi_duties_db.repository;

import com.kpi.kpi_duties_db.domain.RtCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RtCodeRepository extends JpaRepository<RtCodeEntity, Integer> {

}