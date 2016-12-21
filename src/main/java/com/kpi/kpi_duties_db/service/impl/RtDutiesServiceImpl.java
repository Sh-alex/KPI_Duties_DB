package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.dcduties.RtDutiesEntity;
import com.kpi.kpi_duties_db.repository.RtDutiesRepository;
import com.kpi.kpi_duties_db.repository.dao.RtDutiesDao;
import com.kpi.kpi_duties_db.service.RtDutiesService;
import com.kpi.kpi_duties_db.service.utils.converters.occupation.OccupationConverter;
import com.kpi.kpi_duties_db.shared.dto.occupation.OccupationGetDto;
import com.kpi.kpi_duties_db.shared.dto.occupation.OccupationsSearchResultDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Service
public class RtDutiesServiceImpl extends BaseServiceImpl<RtDutiesEntity> implements RtDutiesService {

    @Autowired
    private RtDutiesDao dao;

    @Autowired
    private OccupationConverter converter;

    @Autowired
    private RtDutiesRepository repository;


    @Override
    @Transactional(readOnly = true)
    public OccupationsSearchResultDto getByParams(OccupationGetDto dto) {
        OccupationsSearchResultDto occupations = dao.findByFields(converter.toParamMapFromOccupationGetDto(dto));

        return occupations;
    }

    @Override
    public RtDutiesEntity findByName(String name) {
        return repository.findByName(name);
    }
}