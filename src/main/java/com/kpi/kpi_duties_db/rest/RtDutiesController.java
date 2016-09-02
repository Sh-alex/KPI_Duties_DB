package com.kpi.kpi_duties_db.rest;

import com.kpi.kpi_duties_db.domain.DutiesValidityDateEntity;
import com.kpi.kpi_duties_db.domain.RtCodeEntity;
import com.kpi.kpi_duties_db.domain.RtDutiesEntity;
import com.kpi.kpi_duties_db.repository.RtDutiesRepository;
import com.kpi.kpi_duties_db.service.*;
import com.kpi.kpi_duties_db.service.utils.converters.occupation.OccupationConverter;
import com.kpi.kpi_duties_db.shared.addingoccupation.request.OccupationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
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

        dutiesValidityDateService.add(converter.toDutiesValidityDateEntityListFromOccupationRequest(request, rtDutiesEntity.getId()));

        List<RtCodeEntity> rtCodes = rtCodeService.add(converter.toRtCodeEntityListFromOccupationRequest(request));

        rtDutiesCodeService.add(rtDutiesEntity.getId(), rtCodes);

        rtDutiesTaskAndResponsibilitiesService.add(converter.toRtDutiesTaskAndResponsibilitiesEntityListFromOccupationRequest(request, rtDutiesEntity.getId()));
        rtDutiesMustKnowService.add(converter.toRtDutiesMustKnowEntityListFromOccupationRequest(request, rtDutiesEntity.getId()));
        rtDutiesQualificationRequirementsService.add(converter.toRtDutiesQualificationRequirementsEntityListFromOccupationRequest(request, rtDutiesEntity.getId()));

        return Response.ok().build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@NotNull OccupationRequest request, @PathParam("id") Integer id) {

        RtDutiesEntity entity = converter.toRtDutiesEntityFromOccupationRequest(request);
        entity.setId(id);
        RtDutiesEntity rtDutiesEntity = rtDutiesService.edit(entity);

        List<DutiesValidityDateEntity> entities = converter.toDutiesValidityDateEntityListFromOccupationRequest(request, rtDutiesEntity.getId());
        dutiesValidityDateService.edit(entities);

        List<RtCodeEntity> rtCodes = rtCodeService.edit(converter.toRtCodeEntityListFromOccupationRequest(request));

        rtDutiesCodeService.edit(rtDutiesEntity.getId(), rtCodes);

        rtDutiesTaskAndResponsibilitiesService.edit(converter.toRtDutiesTaskAndResponsibilitiesEntityListFromOccupationRequest(request, rtDutiesEntity.getId()));
        rtDutiesMustKnowService.edit(converter.toRtDutiesMustKnowEntityListFromOccupationRequest(request, rtDutiesEntity.getId()));
        rtDutiesQualificationRequirementsService.edit(converter.toRtDutiesQualificationRequirementsEntityListFromOccupationRequest(request, rtDutiesEntity.getId()));

        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Integer id) {

        rtDutiesService.delete(id);

        return Response.ok().build();
    }
}
