package com.kpi.kpi_duties_db.service;

import com.kpi.kpi_duties_db.domain.DcDutiesPartitionEntity;

import java.util.List;

public interface DcDutiesPartitionEntityService {

    DcDutiesPartitionEntity addDcDutiesPartitionEntity(DcDutiesPartitionEntity bank);
    void delete(int id);
    DcDutiesPartitionEntity getByName(String name);
    DcDutiesPartitionEntity editDcDutiesPartitionEntity(DcDutiesPartitionEntity bank);
    List<DcDutiesPartitionEntity> getAll();
}
