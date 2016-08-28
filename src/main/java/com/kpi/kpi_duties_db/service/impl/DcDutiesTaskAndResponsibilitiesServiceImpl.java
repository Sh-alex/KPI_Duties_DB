package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.DcDutiesTasksAndResponsibilitiesEntity;
import com.kpi.kpi_duties_db.repository.DcDutiesTasksAndResponsibilitiesRepository;
import com.kpi.kpi_duties_db.service.DcDutiesTaskAndResponsibilitiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 27.08.2016
 */

@Service
public class DcDutiesTaskAndResponsibilitiesServiceImpl implements DcDutiesTaskAndResponsibilitiesService {

    @Autowired
    private DcDutiesTasksAndResponsibilitiesRepository dcDutiesTasksAndResponsibilitiesRepository;

    @Override
    public DcDutiesTasksAndResponsibilitiesEntity add(DcDutiesTasksAndResponsibilitiesEntity entity) {
        return dcDutiesTasksAndResponsibilitiesRepository.saveAndFlush(entity);
    }

    @Override
    public void delete(int id) {

    }

    @Override
    public DcDutiesTasksAndResponsibilitiesEntity edit(DcDutiesTasksAndResponsibilitiesEntity entity) {
        return dcDutiesTasksAndResponsibilitiesRepository.saveAndFlush(entity);
    }

    @Override
    public List<DcDutiesTasksAndResponsibilitiesEntity> getAll() {
        return null;
    }
}
