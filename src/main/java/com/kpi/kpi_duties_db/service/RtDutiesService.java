package com.kpi.kpi_duties_db.service;

import com.kpi.kpi_duties_db.domain.RtDutiesEntity;
import com.kpi.kpi_duties_db.shared.dto.occupation.OccupationGetDto;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 24.08.2016
 */

public interface RtDutiesService extends BaseService<RtDutiesEntity> {

    List<RtDutiesEntity> getByParams(OccupationGetDto dto);
}
