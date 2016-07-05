package com.kpi.kpi_duties_db.repository;

import com.kpi.kpi_duties_db.domain.RtDutiesMustKnowEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RtDutiesMustKnowEntityRepository extends JpaRepository<RtDutiesMustKnowEntity, Integer> {

}