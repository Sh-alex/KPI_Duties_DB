package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.DcDutiesMustKnowEntity;
import com.kpi.kpi_duties_db.repository.DcDutiesMustKnowRepository;
import com.kpi.kpi_duties_db.service.DcDutiesMustKnowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 27.08.2016
 */

@Service
public class DcDutiesMustKnowServiceImpl implements DcDutiesMustKnowService{

    @Autowired
    DcDutiesMustKnowRepository dcDutiesMustKnowRepository;

    @Override
    public DcDutiesMustKnowEntity add(DcDutiesMustKnowEntity entity) {
        return dcDutiesMustKnowRepository.saveAndFlush(entity);
    }

    @Override
    public void delete(int id) {

    }

    @Override
    public DcDutiesMustKnowEntity edit(DcDutiesMustKnowEntity entity) {
        return null;
    }

    @Override
    public List<DcDutiesMustKnowEntity> getAll() {
        return null;
    }
}
