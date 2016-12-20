package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.dcduties.DcCodeEtkdEntity;
import com.kpi.kpi_duties_db.repository.DcCodeEtkdRepository;
import com.kpi.kpi_duties_db.service.DcCodeEtkdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 25.08.2016
 */

@Service
public class DcCodeEtkdServiceImpl extends BaseServiceImpl<DcCodeEtkdEntity> implements DcCodeEtkdService {

    @Autowired
    private DcCodeEtkdRepository repository;

    @Override
    public DcCodeEtkdEntity findByName(String name) {
        return repository.findByName(name);
    }
}
