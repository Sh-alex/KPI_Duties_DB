package com.kpi.kpi_duties_db.service.utils.converters.occupation;

import com.kpi.kpi_duties_db.domain.*;
import com.kpi.kpi_duties_db.shared.addingoccupation.request.OccupationRequest;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 01.09.2016
 */

public interface OccupationConverter {

    RtDutiesEntity toRtDutiesEntityFromOccupationRequest(OccupationRequest occupationRequest);

    List<DutiesValidityDateEntity> toDutiesValidityDateEntityListFromOccupationRequest(OccupationRequest request, Integer rtDutiesId);

    List<RtCodeEntity> toRtCodeEntityListFromOccupationRequest(OccupationRequest request);

    List<RtDutiesTaskAndResponsibilitiesEntity> toRtDutiesTaskAndResponsibilitiesEntityListFromOccupationRequest(OccupationRequest request, Integer rtDutiesId);

    List<RtDutiesMustKnowEntity> toRtDutiesMustKnowEntityListFromOccupationRequest(OccupationRequest request, Integer rtDutiesId);

    List<RtDutiesQualificationRequirementsEntity> toRtDutiesQualificationRequirementsEntityListFromOccupationRequest(OccupationRequest request, Integer rtDutiesId);

}
