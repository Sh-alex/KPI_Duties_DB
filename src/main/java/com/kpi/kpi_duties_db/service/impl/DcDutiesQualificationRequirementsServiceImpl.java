package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.DcDutiesQualificationRequirementsEntity;
import com.kpi.kpi_duties_db.repository.DcDutiesQualificationRequirementsRepository;
import com.kpi.kpi_duties_db.service.DcDutiesQualificationRequirementsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 27.08.2016
 */

@Service
public class DcDutiesQualificationRequirementsServiceImpl implements DcDutiesQualificationRequirementsService {

    @Autowired
    DcDutiesQualificationRequirementsRepository dcDutiesQualificationRequirementsRepository;
    @Override
    public DcDutiesQualificationRequirementsEntity add(DcDutiesQualificationRequirementsEntity entity) {
        return dcDutiesQualificationRequirementsRepository.saveAndFlush(entity);
    }

    @Override
    public void delete(int id) {
        dcDutiesQualificationRequirementsRepository.delete(id);
    }

    @Override
    public DcDutiesQualificationRequirementsEntity edit(DcDutiesQualificationRequirementsEntity entity) {
        return dcDutiesQualificationRequirementsRepository.saveAndFlush(entity);
    }

    @Override
    public List<DcDutiesQualificationRequirementsEntity> getAll() {
        return null;
    }
}
