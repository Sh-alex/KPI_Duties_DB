package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.DcCodeDkhpEntity;
import com.kpi.kpi_duties_db.repository.DcCodeDkhpRepository;
import com.kpi.kpi_duties_db.service.DcCodeDkhpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 25.08.2016
 */

@Service
public class DcCodeDkhpServiceImpl implements DcCodeDkhpService {

    @Autowired
    DcCodeDkhpRepository dcCodeDkhpRepository;

    @Override
    public DcCodeDkhpEntity add(DcCodeDkhpEntity entity) {
        return dcCodeDkhpRepository.saveAndFlush(entity);
    }

    @Override
    public void delete(int id) {
        dcCodeDkhpRepository.delete(id);
    }

    @Override
    public DcCodeDkhpEntity edit(DcCodeDkhpEntity entity) {
        return dcCodeDkhpRepository.saveAndFlush(entity);
    }

    @Override
    public List<DcCodeDkhpEntity> getAll() {
        return dcCodeDkhpRepository.findAll();
    }
}
