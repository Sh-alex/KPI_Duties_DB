package com.kpi.kpi_duties_db.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kpi.kpi_duties_db.domain.DutiesValidityDateEntity;
import com.kpi.kpi_duties_db.domain.RtCodeEntity;
import com.kpi.kpi_duties_db.domain.RtDutiesEntity;
import com.kpi.kpi_duties_db.service.*;
import com.kpi.kpi_duties_db.service.utils.converters.idname.IdNameConverter;
import com.kpi.kpi_duties_db.service.utils.converters.occupation.OccupationConverter;
import com.kpi.kpi_duties_db.shared.dto.occupation.OccupationGetDto;
import com.kpi.kpi_duties_db.shared.request.occupation.OccupationGetRequest;
import com.kpi.kpi_duties_db.shared.request.occupation.OccupationRequest;
import com.kpi.kpi_duties_db.shared.response.IdNameListResponse;
import com.kpi.kpi_duties_db.shared.response.occupation.OccupationsGetResponse;
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
import java.util.List;
import java.util.stream.Collectors;

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
    private OccupationConverter converter;

    @Autowired
    private RtDutiesService rtDutiesService;

    @Autowired
    private DutiesValidityDateService dutiesValidityDateService;

    @Autowired
    private RtCodeService rtCodeService;

    @Autowired
    private RtDutiesCodeService rtDutiesCodeService;

    @Autowired
    private RtDutiesTaskAndResponsibilitiesService rtDutiesTaskAndResponsibilitiesService;

    @Autowired
    private RtDutiesMustKnowService rtDutiesMustKnowService;

    @Autowired
    private RtDutiesQualificationRequirementsService rtDutiesQualificationRequirementsService;

    @Autowired
    private Validator validator;

    @Autowired
    private IdNameConverter idNameConverter;

    private final static Logger logger = LoggerFactory.getLogger(RtDutiesController.class);


    @POST
    @Transactional
    public Response create(@NotNull OccupationRequest request) {
        ValidatorObject.validate(request, logger, validator);
        RtDutiesEntity entity = converter.toRtDutiesEntityFromOccupationRequest(request, null);
        RtDutiesEntity rtDutiesEntity = rtDutiesService.add(entity);

        dutiesValidityDateService.add(converter.toDutiesValidityDateEntityListFromOccupationRequest(request, rtDutiesEntity.getId()));

        List<RtCodeEntity> rtCodes = rtCodeService.add(converter.toRtCodeEntityListFromOccupationRequest(request, rtDutiesEntity.getId()));

        rtDutiesCodeService.add(rtDutiesEntity.getId(), rtCodes);

        rtDutiesTaskAndResponsibilitiesService.add(converter.toRtDutiesTaskAndResponsibilitiesEntityListFromOccupationRequest(request, rtDutiesEntity.getId()));
        rtDutiesMustKnowService.add(converter.toRtDutiesMustKnowEntityListFromOccupationRequest(request, rtDutiesEntity.getId()));
        rtDutiesQualificationRequirementsService.add(converter.toRtDutiesQualificationRequirementsEntityListFromOccupationRequest(request, rtDutiesEntity.getId()));

        return Response.ok().entity(rtDutiesEntity).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@NotNull OccupationRequest request, @PathParam("id") Integer id) {
        ValidatorObject.validate(request, logger, validator);
        RtDutiesEntity entity = converter.toRtDutiesEntityFromOccupationRequest(request, id);
        entity.setId(id);
        RtDutiesEntity rtDutiesEntity = rtDutiesService.update(entity);

        List<DutiesValidityDateEntity> entities = converter.toDutiesValidityDateEntityListFromOccupationRequest(request, rtDutiesEntity.getId());
        dutiesValidityDateService.update(entities);

        List<RtCodeEntity> rtCodeList = converter.toRtCodeEntityListFromOccupationRequest(request, rtDutiesEntity.getId());
        //Знаходжу нові набори кодів, які ще не створено
        List<RtCodeEntity> rtCodeNew = rtCodeList.stream().filter(item->item.getId() == null).collect(Collectors.toList());
        List<RtCodeEntity> rtCodesAdd = rtCodeService.add(rtCodeNew);
        //Створюю для нових набори кодів RtDutiesCode
        rtDutiesCodeService.add(rtDutiesEntity.getId(), rtCodesAdd);
        //Відсікаю нові набори кодів і залишаю тільки ті, які треба редагувати
        if (!rtCodeNew.isEmpty()) {
            rtCodeList.retainAll(rtCodeNew);
        }
        List<RtCodeEntity> rtCodes = rtCodeService.update(rtCodeList);

        rtDutiesTaskAndResponsibilitiesService.update(converter.toRtDutiesTaskAndResponsibilitiesEntityListFromOccupationRequest(request, rtDutiesEntity.getId()));
        rtDutiesMustKnowService.update(converter.toRtDutiesMustKnowEntityListFromOccupationRequest(request, rtDutiesEntity.getId()));
        rtDutiesQualificationRequirementsService.update(converter.toRtDutiesQualificationRequirementsEntityListFromOccupationRequest(request, rtDutiesEntity.getId()));

        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Integer id) {
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
    public IdNameListResponse getAllDutiesNames(@Context UriInfo uriInfo) {
        MultivaluedMap parameters = uriInfo.getQueryParameters();
        OccupationGetRequest occupationRequest = null;
        if (parameters.size() != 0) {
            final ObjectMapper mapper = new ObjectMapper();
            occupationRequest = mapper.convertValue(parameters, OccupationGetRequest.class);
        }

        OccupationGetDto occupationGetDto = converter.toOccupationDtoFromOccupationGetRequest(occupationRequest);

        List<RtDutiesEntity> result = rtDutiesService.getByParams(occupationGetDto);

        IdNameListResponse response = idNameConverter.toIdNameListResponseFromEntityList(result);

        return response;
    }
}