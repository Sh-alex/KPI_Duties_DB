package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.DcDutiesNameEntity;
import com.kpi.kpi_duties_db.repository.DcDutiesNameRepository;
import com.kpi.kpi_duties_db.service.DcDutiesNameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Service
public class DcDutiesNameServiceImpl implements DcDutiesNameService {

    @Autowired
    private
    DcDutiesNameRepository dcDutiesNameRepository;

    @Override
    @Transactional
    public DcDutiesNameEntity add(DcDutiesNameEntity entity) {

        return dcDutiesNameRepository.saveAndFlush(entity);
    }

    @Override
    public void delete(int id) {
        dcDutiesNameRepository.delete(id);
    }

    public DcDutiesNameEntity getByName(String name) {
        return dcDutiesNameRepository.getByName(name);
    }

    @Override
    public DcDutiesNameEntity edit(DcDutiesNameEntity entity) {
        return dcDutiesNameRepository.saveAndFlush(entity);
    }

    @Override
    public List<DcDutiesNameEntity> getAll() {
        return dcDutiesNameRepository.findAll();
    }

}
