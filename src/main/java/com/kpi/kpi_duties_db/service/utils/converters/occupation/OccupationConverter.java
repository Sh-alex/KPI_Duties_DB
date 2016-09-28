package com.kpi.kpi_duties_db.service.utils.converters.occupation;

import com.kpi.kpi_duties_db.domain.*;
import com.kpi.kpi_duties_db.shared.dto.occupation.OccupationGetDto;
import com.kpi.kpi_duties_db.shared.request.occupation.OccupationGetRequest;
import com.kpi.kpi_duties_db.shared.request.occupation.OccupationRequest;
import com.kpi.kpi_duties_db.shared.response.occupation.OccupationsGetResponse;

import java.util.List;
import java.util.Map;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 01.09.2016
 */

public interface OccupationConverter {

    RtDutiesEntity toRtDutiesEntityFromOccupationRequest(OccupationRequest occupationRequest);

    List<DutiesValidityDateEntity> toDutiesValidityDateEntityListFromOccupationRequest(OccupationRequest request, Integer rtDutiesId);

    List<DutiesValidityDateEntity> toDutiesValidityDateEntityUpdateListFromOccupationRequest(OccupationRequest request, RtDutiesEntity  rtDutiesEntity);

    List<RtCodeEntity> toRtCodeEntityListFromOccupationRequest(OccupationRequest request);

    List<RtDutiesTaskAndResponsibilitiesEntity> toRtDutiesTaskAndResponsibilitiesEntityListFromOccupationRequest(OccupationRequest request, Integer rtDutiesId);

    List<RtDutiesMustKnowEntity> toRtDutiesMustKnowEntityListFromOccupationRequest(OccupationRequest request, Integer rtDutiesId);

    List<RtDutiesQualificationRequirementsEntity> toRtDutiesQualificationRequirementsEntityListFromOccupationRequest(OccupationRequest request, Integer rtDutiesId);

    OccupationGetDto toOccupationDtoFromOccupationGetRequest(OccupationGetRequest request);

    Map<String, Object> toParamMapFromOccupationGetDto(OccupationGetDto dto);

   OccupationsGetResponse toOccupationsGetResponseFromRtDutiesEntityList(List<RtDutiesEntity> list);
}
