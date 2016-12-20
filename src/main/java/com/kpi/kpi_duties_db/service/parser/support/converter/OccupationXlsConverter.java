package com.kpi.kpi_duties_db.service.parser.support.converter;

import com.kpi.kpi_duties_db.domain.dcduties.DutiesValidityDateEntity;
import com.kpi.kpi_duties_db.domain.dcduties.RtCodeEntity;
import com.kpi.kpi_duties_db.domain.dcduties.RtDutiesEntity;
import com.kpi.kpi_duties_db.service.parser.support.OccupationFromXls;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 10.12.2016
 */

public interface OccupationXlsConverter {

    RtDutiesEntity toRtDutiesEntityFromOccupationXls(OccupationFromXls occupationFromXls, Integer clarification, Integer parentId);

    DutiesValidityDateEntity toDutiesValidityDateEntityListFromOccupationXls(OccupationFromXls occupationFromXls, Integer rtDutiesId);

    List<RtCodeEntity> toRtCodeEntityListFromOccupationXls(OccupationFromXls occupationFromXls);
}
