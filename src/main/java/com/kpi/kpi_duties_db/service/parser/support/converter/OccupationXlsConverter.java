package com.kpi.kpi_duties_db.service.parser.support.converter;

import com.kpi.kpi_duties_db.domain.RtDutiesEntity;
import com.kpi.kpi_duties_db.service.parser.support.OccupationFromXls;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 10.12.2016
 */

public interface OccupationXlsConverter {

    RtDutiesEntity toRtDutiesEntityFromOccupationXls(OccupationFromXls occupationFromXls, Integer clarification, Integer parentId);
}
