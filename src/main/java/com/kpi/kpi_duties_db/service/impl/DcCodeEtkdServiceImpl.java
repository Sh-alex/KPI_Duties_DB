package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.DcCodeEtkdEntity;
import com.kpi.kpi_duties_db.repository.DcCodeEtkdRepository;
import com.kpi.kpi_duties_db.service.DcCodeEtkdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 25.08.2016
 */

@Service
public class DcCodeEtkdServiceImpl implements DcCodeEtkdService {

    @Autowired
    DcCodeEtkdRepository dcCodeEtkdRepository;

    @Override
    public DcCodeEtkdEntity add(DcCodeEtkdEntity entity) {
        return dcCodeEtkdRepository.saveAndFlush(entity);
    }

    @Override
    public void delete(int id) {

    }

    @Override
    public DcCodeEtkdEntity edit(DcCodeEtkdEntity entity) {
        return null;
    }

    @Override
    public List<DcCodeEtkdEntity> getAll() {
        return dcCodeEtkdRepository.findAll();
    }
}
