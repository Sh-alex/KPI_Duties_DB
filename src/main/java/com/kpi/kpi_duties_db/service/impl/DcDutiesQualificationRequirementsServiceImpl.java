package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.DcDutiesQualificationRequirementsEntity;
import com.kpi.kpi_duties_db.repository.DcDutiesQualificationRequirementsRepository;
import com.kpi.kpi_duties_db.service.DcDutiesQualificationRequirementsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 27.08.2016
 */

@Service
public class DcDutiesQualificationRequirementsServiceImpl extends BaseServiceImpl<DcDutiesQualificationRequirementsEntity> implements DcDutiesQualificationRequirementsService {

    @Autowired
    DcDutiesQualificationRequirementsRepository repository;

    @Override
    public DcDutiesQualificationRequirementsEntity getById(Integer id) {
        return repository.getById(id);
    }
}
