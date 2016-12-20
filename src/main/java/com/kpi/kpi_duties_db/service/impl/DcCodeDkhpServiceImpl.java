package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.dcduties.DcCodeDkhpEntity;
import com.kpi.kpi_duties_db.repository.DcCodeDkhpRepository;
import com.kpi.kpi_duties_db.service.DcCodeDkhpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 25.08.2016
 */

@Service
public class DcCodeDkhpServiceImpl extends BaseServiceImpl<DcCodeDkhpEntity> implements DcCodeDkhpService {

    @Autowired
    private DcCodeDkhpRepository repository;

    @Override
    public DcCodeDkhpEntity findByName(String name) {
        return repository.findByName(name);
    }
}
