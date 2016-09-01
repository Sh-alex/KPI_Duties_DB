package com.kpi.kpi_duties_db.rest;

import com.kpi.kpi_duties_db.domain.DutiesValidityDateEntity;
import com.kpi.kpi_duties_db.domain.RtCodeEntity;
import com.kpi.kpi_duties_db.domain.RtDutiesEntity;
import com.kpi.kpi_duties_db.domain.RtDutiesMustKnowEntity;
import com.kpi.kpi_duties_db.repository.RtDutiesRepository;
import com.kpi.kpi_duties_db.service.*;
import com.kpi.kpi_duties_db.service.utils.converters.occupation.OccupationConverter;
import com.kpi.kpi_duties_db.shared.addingoccupation.request.OccupationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 28.08.2016
 */

@Path("/occupations")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Component
public class RtDutiesController {

    @Autowired
    OccupationConverter converter;

    @Autowired
    RtDutiesService rtDutiesService;

    @Autowired
    DutiesValidityDateService dutiesValidityDateService;

    @Autowired
    RtCodeService rtCodeService;

    @Autowired
    RtDutiesCodeService rtDutiesCodeService;

    @Autowired
    RtDutiesTaskAndResponsibilitiesService rtDutiesTaskAndResponsibilitiesService;

    @Autowired
    RtDutiesMustKnowService rtDutiesMustKnowService;

    @Autowired
    RtDutiesQualificationRequirementsService rtDutiesQualificationRequirementsService;

    @Autowired
    RtDutiesRepository rtDutiesRepository;

    @POST
    @Transactional
    public Response create(@NotNull OccupationRequest request) {

        RtDutiesEntity rtDutiesEntity = rtDutiesService.add(converter.toRtDutiesEntityFromOccupationRequest(request));

        List<DutiesValidityDateEntity> entities = converter.toDutiesValidityDateEntityListFromOccupationRequest(request, rtDutiesEntity.getId());
        dutiesValidityDateService.add(entities);

        List<RtCodeEntity> rtCodes = rtCodeService.add(converter.toRtCodeEntityListFromOccupationRequest(request));

        rtDutiesCodeService.add(rtDutiesEntity.getId() ,rtCodes);


        rtDutiesTaskAndResponsibilitiesService.add(converter.toRtDutiesTaskAndResponsibilitiesEntityListFromOccupationRequest(request, rtDutiesEntity.getId()));
        List<RtDutiesMustKnowEntity> entity = converter.toRtDutiesMustKnowEntityListFromOccupationRequest(request, rtDutiesEntity.getId());
        rtDutiesMustKnowService.add(entity);
        rtDutiesQualificationRequirementsService.add(converter.toRtDutiesQualificationRequirementsEntityListFromOccupationRequest(request, rtDutiesEntity.getId()));

        return Response.ok().build();
    }
}
