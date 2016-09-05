package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.DcDutiesPartitionEntity;
import com.kpi.kpi_duties_db.repository.DcDutiesPartitionRepository;
import com.kpi.kpi_duties_db.service.DcDutiesPartitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Service
public class DcDutiesPartitionServiceImpl extends BaseServiceImpl<DcDutiesPartitionEntity> implements DcDutiesPartitionService {

    @Autowired
    DcDutiesPartitionRepository repository;

    @Override
    public DcDutiesPartitionEntity getById(Integer id) {
        return repository.getById(id);
    }
}
