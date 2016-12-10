package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.DcDutiesNameEntity;
import com.kpi.kpi_duties_db.repository.DcDutiesNameRepository;
import com.kpi.kpi_duties_db.service.DcDutiesNameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Service
public class DcDutiesNameServiceImpl extends BaseServiceImpl<DcDutiesNameEntity> implements DcDutiesNameService {

    @Autowired
    DcDutiesNameRepository repository;

    @Override
    public DcDutiesNameEntity findByName(String name){

        return repository.findByName(name);
    }
}
