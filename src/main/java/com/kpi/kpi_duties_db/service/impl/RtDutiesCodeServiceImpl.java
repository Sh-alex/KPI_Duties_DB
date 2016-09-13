package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.RtCodeEntity;
import com.kpi.kpi_duties_db.domain.RtDutiesCodeEntity;
import com.kpi.kpi_duties_db.repository.RtCodeRepository;
import com.kpi.kpi_duties_db.repository.RtDutiesCodeRepository;
import com.kpi.kpi_duties_db.repository.RtDutiesRepository;
import com.kpi.kpi_duties_db.service.RtDutiesCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 01.09.2016
 */

@Service
public class RtDutiesCodeServiceImpl extends BaseServiceImpl<RtDutiesCodeEntity> implements RtDutiesCodeService {

    @Autowired
    RtDutiesCodeRepository repository;

    @Autowired
    RtDutiesRepository rtDutiesEntity;

    @Autowired
    RtCodeRepository rtCodeRepository;

    @Override
    public List<RtDutiesCodeEntity> add(Integer rtDutiesId, List<RtCodeEntity> rtCodeEntities) {

        List<RtDutiesCodeEntity> list = new ArrayList<>();
        for (RtCodeEntity rtCodeEntity : rtCodeEntities) {
            RtDutiesCodeEntity entity = new RtDutiesCodeEntity();

            entity.setRtCodeId(rtCodeEntity.getId());
            entity.setRtDutiesId(rtDutiesId);

            entity.setDateStart(rtCodeEntity.getDateStart());
            entity.setDateStop(rtCodeEntity.getDateStop());
            list.add(repository.saveAndFlush(entity));
        }
        return list;
    }

    @Override
    public List<RtDutiesCodeEntity> edit(Integer rtDutiesId, List<RtCodeEntity> rtCodeEntities) {
        List<RtDutiesCodeEntity> list = new ArrayList<>();
        for (RtCodeEntity rtCodeEntity : rtCodeEntities) {
            RtDutiesCodeEntity entity = new RtDutiesCodeEntity();

            entity.setRtCodeId(rtCodeEntity.getId());
            entity.setRtDutiesId(rtDutiesId);

            entity.setDateStart(rtCodeEntity.getDateStart());
            entity.setDateStop(rtCodeEntity.getDateStop());
            list.add(repository.saveAndFlush(entity));
        }
        return list;
    }
}
