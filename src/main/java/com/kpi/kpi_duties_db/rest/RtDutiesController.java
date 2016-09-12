package com.kpi.kpi_duties_db.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kpi.kpi_duties_db.domain.DutiesValidityDateEntity;
import com.kpi.kpi_duties_db.domain.RtCodeEntity;
import com.kpi.kpi_duties_db.domain.RtDutiesEntity;
import com.kpi.kpi_duties_db.service.*;
import com.kpi.kpi_duties_db.service.utils.converters.occupation.OccupationConverter;
import com.kpi.kpi_duties_db.shared.dto.occupation.OccupationGetDto;
import com.kpi.kpi_duties_db.shared.request.occupation.OccupationGetRequest;
import com.kpi.kpi_duties_db.shared.request.occupation.OccupationRequest;
import com.kpi.kpi_duties_db.shared.response.ListIdNameResponse;
import com.kpi.kpi_duties_db.shared.response.occupation.OccupationsGetResponse;
import com.kpi.kpi_duties_db.shared.response.support.IdNameResponse;
import com.kpi.kpi_duties_db.shared.validator.ValidatorObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Validator;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.util.ArrayList;
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
    DcDutiesMustKnowService dcDutiesMustKnowService;

    @Autowired
    DcDutiesTaskAndResponsibilitiesService dcDutiesTaskAndResponsibilitiesService;

    @Autowired
    DcDutiesQualificationRequirementsService dcDutiesQualificationRequirementsService;

    @Autowired
    private Validator validator;

    private final static Logger logger = LoggerFactory.getLogger(RtDutiesController.class);


    @POST
    @Transactional
    public Response create(@NotNull OccupationRequest request) {
        ValidatorObject.validate(request, logger, validator);
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
        //TODO
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
       /* RtDutiesEntity entity = rtDutiesService.getById(id);

        for (RtDutiesMustKnowEntity rtDutiesMustKnowEntity : entity.getRtDutiesMustKnowEntities()) {
            DcDutiesMustKnowEntity dcDutiesMustKnowEntity = dcDutiesMustKnowService.getById(rtDutiesMustKnowEntity.getDcDutiesMustKnowId());
            if (dcDutiesMustKnowEntity.getRtDutiesMustKnowEntities().size() <= 1) {
                dcDutiesMustKnowService.delete(dcDutiesMustKnowEntity.getId());
            }
        }
        for (RtDutiesTaskAndResponsibilitiesEntity rtDutiesTaskAndResponsibilitiesEntity : entity.getRtDutiesTaskAndResponsibilitiesEntities()) {
            DcDutiesTasksAndResponsibilitiesEntity dcDutiesTasksAndResponsibilitiesEntity =
                    dcDutiesTaskAndResponsibilitiesService.getById(rtDutiesTaskAndResponsibilitiesEntity.getDcDutiesTasksAndResponsibilitiesId());
            if (dcDutiesTasksAndResponsibilitiesEntity.getRtDutiesTaskAndResponsibilitiesEntities().size() <= 1) {
                dcDutiesTaskAndResponsibilitiesService.delete(dcDutiesTasksAndResponsibilitiesEntity.getId());
            }
        }
        for (RtDutiesQualificationRequirementsEntity rtDutiesQualificationRequirementsEntity : entity.getRtDutiesQualificationRequirementsEntities()) {
            try {
                DcDutiesQualificationRequirementsEntity dcDutiesQualificationRequirementsEntity =
                        dcDutiesQualificationRequirementsService.getById(rtDutiesQualificationRequirementsEntity.getDcDutiesQualificationRequirementsId());

                dcDutiesQualificationRequirementsService.delete(dcDutiesQualificationRequirementsEntity.getId());
            } catch (Exception e) {
                e.printStackTrace();
            }

        }*/

        rtDutiesService.delete(id);

        return Response.ok().build();
    }

    @GET
    @Transactional
    public Response getAll(@Context UriInfo uriInfo) {
        MultivaluedMap parameters = uriInfo.getQueryParameters();
        OccupationGetRequest occupationRequest = null;
        if (parameters.size() != 0) {
            final ObjectMapper mapper = new ObjectMapper();
            occupationRequest = mapper.convertValue(parameters, OccupationGetRequest.class);
        }

        OccupationGetDto occupationGetDto = converter.toOccupationDtoFromOccupationGetRequest(occupationRequest);

        List<RtDutiesEntity> result = rtDutiesService.getByParams(occupationGetDto);

        OccupationsGetResponse response = converter.toOccupationsGetResponseFromRtDutiesEntityList(result);

        return Response.ok().entity(response).build();
    }

    @GET
    @Path("/clarifiedOccup")
    public ListIdNameResponse getAllDutiesNames() {

        List<RtDutiesEntity> all = rtDutiesService.getAll();

        ListIdNameResponse response = new ListIdNameResponse();

        response.setIdNameResponses(new ArrayList<>());

        for (RtDutiesEntity entity : all) {
            IdNameResponse idNameResponse = new IdNameResponse();
            idNameResponse.setId(entity.getId());
            idNameResponse.setName(entity.getName());

            response.getIdNameResponses().add(idNameResponse);
        }
        return response;
    }
}