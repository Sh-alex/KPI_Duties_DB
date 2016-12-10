package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.RtDutiesEntity;
import com.kpi.kpi_duties_db.repository.RtDutiesRepository;
import com.kpi.kpi_duties_db.repository.dao.RtDutiesDao;
import com.kpi.kpi_duties_db.service.RtDutiesService;
import com.kpi.kpi_duties_db.service.utils.converters.occupation.OccupationConverter;
import com.kpi.kpi_duties_db.shared.dto.occupation.OccupationGetDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Service
public class RtDutiesServiceImpl extends BaseServiceImpl<RtDutiesEntity> implements RtDutiesService {

    @Autowired
    RtDutiesDao dao;

    @Autowired
    OccupationConverter converter;

    @Autowired
    RtDutiesRepository repository;


    @Override
    @Transactional(readOnly = true)
    public List<RtDutiesEntity> getByParams(OccupationGetDto dto) {
        List<RtDutiesEntity> occupations = dao.findByFields(converter.toParamMapFromOccupationGetDto(dto));

        return occupations;
    }

    @Override
    public RtDutiesEntity findByName(String name) {
        return repository.findByName(name);
    }
}