package com.kpi.kpi_duties_db.rest;

import com.kpi.kpi_duties_db.domain.DcDutiesQualificationRequirementsEntity;
import com.kpi.kpi_duties_db.service.DcDutiesQualificationRequirementsService;
import com.kpi.kpi_duties_db.service.utils.converters.idname.IdNameConverter;
import com.kpi.kpi_duties_db.service.utils.usingoccupations.UsingOccupations;
import com.kpi.kpi_duties_db.shared.request.NewValueRequest;
import com.kpi.kpi_duties_db.shared.response.IdNameListResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 27.08.2016
 */
@Path("/qualiff_requir")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Component
public class DcDutiesQualificationRequirementsController {

    @Autowired
    private DcDutiesQualificationRequirementsService dcDutiesQualificationRequirementsService;

    @Autowired
    private IdNameConverter idNameConverter;

    @Autowired
    private UsingOccupations usingOccupations;

    @GET
    public Response getAll() {

        List<DcDutiesQualificationRequirementsEntity> all = dcDutiesQualificationRequirementsService.getAll();
        IdNameListResponse response = idNameConverter.toIdNameListResponseFromEntityList(all);
        response = usingOccupations.findUsingOccupationsIdForRtDutiesQualificationRequirements(response);

        return Response.ok(response).build();
    }

    @POST
    public Response add(@NotNull NewValueRequest request) {

        DcDutiesQualificationRequirementsEntity entity = new DcDutiesQualificationRequirementsEntity();

        entity.setText(request.getNewVal());
        dcDutiesQualificationRequirementsService.add(entity);

        return Response.ok().entity(entity).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@NotNull NewValueRequest request, @PathParam("id") Integer id) {

        DcDutiesQualificationRequirementsEntity entity = new DcDutiesQualificationRequirementsEntity();
        entity.setId(id);
        entity.setText(request.getNewVal());
        dcDutiesQualificationRequirementsService.update(entity);

        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Integer id) {

        dcDutiesQualificationRequirementsService.delete(id);

        return Response.ok().build();
    }
}
