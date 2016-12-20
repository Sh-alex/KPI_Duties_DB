package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.dcduties.DcCodeKpEntity;
import com.kpi.kpi_duties_db.repository.DcCodeKpRepository;
import com.kpi.kpi_duties_db.service.DcCodeKpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 25.08.2016
 */

@Service
public class DcCodeKpServiceImpl extends BaseServiceImpl<DcCodeKpEntity> implements DcCodeKpService {

    @Autowired
    private DcCodeKpRepository repository;

    @Override
    public DcCodeKpEntity findByName(String name) {
        return repository.findByName(name);
    }
}
