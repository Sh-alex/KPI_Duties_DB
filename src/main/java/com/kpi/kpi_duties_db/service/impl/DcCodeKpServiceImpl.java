package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.DcCodeKpEntity;
import com.kpi.kpi_duties_db.repository.DcCodeKpRepository;
import com.kpi.kpi_duties_db.service.DcCodeKpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 25.08.2016
 */

@Service
public class DcCodeKpServiceImpl implements DcCodeKpService {

    @Autowired
    DcCodeKpRepository dcCodeKpRepository;

    @Override
    public DcCodeKpEntity add(DcCodeKpEntity entity) {
        return null;
    }

    @Override
    public void delete(int id) {

    }

    @Override
    public DcCodeKpEntity edit(DcCodeKpEntity entity) {
        return null;
    }

    @Override
    public List<DcCodeKpEntity> getAll() {
        return dcCodeKpRepository.findAll();
    }
}
