package com.kpi.kpi_duties_db.service;

import com.kpi.kpi_duties_db.domain.dcduties.RtDutiesEntity;
import com.kpi.kpi_duties_db.shared.dto.occupation.OccupationGetDto;
import com.kpi.kpi_duties_db.shared.dto.occupation.OccupationsSearchResultDto;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 24.08.2016
 */

public interface RtDutiesService extends BaseService<RtDutiesEntity> {

    OccupationsSearchResultDto getByParams(OccupationGetDto dto);

    RtDutiesEntity findByName(String name);
}
