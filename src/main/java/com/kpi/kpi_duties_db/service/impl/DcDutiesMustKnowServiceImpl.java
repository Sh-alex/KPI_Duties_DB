package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.DcDutiesMustKnowEntity;
import com.kpi.kpi_duties_db.repository.DcDutiesMustKnowRepository;
import com.kpi.kpi_duties_db.service.DcDutiesMustKnowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 27.08.2016
 */

@Service
public class DcDutiesMustKnowServiceImpl extends BaseServiceImpl<DcDutiesMustKnowEntity> implements DcDutiesMustKnowService{

    @Autowired
    DcDutiesMustKnowRepository repository;

    @Override
    public DcDutiesMustKnowEntity getById(Integer id) {
        return repository.getById(id);
    }
}
