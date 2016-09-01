package com.kpi.kpi_duties_db.service;

import com.kpi.kpi_duties_db.domain.RtCodeEntity;
import com.kpi.kpi_duties_db.domain.RtDutiesCodeEntity;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 01.09.2016
 */

public interface RtDutiesCodeService extends BaseService<RtDutiesCodeEntity> {

     List<RtDutiesCodeEntity> add(Integer rtDutiesId, List<RtCodeEntity> rtCodeEntities);
}
