package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.DcCodeZkpptrEntity;
import com.kpi.kpi_duties_db.repository.DcCodeZkpptrRepository;
import com.kpi.kpi_duties_db.service.DcCodeZkpptrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 25.08.2016
 */

@Service
public class DcCodeZkpptrServiceImpl extends BaseServiceImpl<DcCodeZkpptrEntity> implements DcCodeZkpptrService {

    @Autowired
    private DcCodeZkpptrRepository repository;

    @Override
    public DcCodeZkpptrEntity findByName(String name) {
        return repository.findByName(name);
    }
}
