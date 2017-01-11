package com.kpi.kpi_duties_db.repository.dao;

import com.kpi.kpi_duties_db.shared.dto.occupation.OccupationsSearchResultDto;

import java.util.Map;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 04.09.2016
 */

public interface RtDutiesDao {

    OccupationsSearchResultDto findByFields(Map<String, Object> paramsMap);
}
