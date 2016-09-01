package com.kpi.kpi_duties_db.rest;

import com.kpi.kpi_duties_db.domain.DcDutiesQualificationRequirementsEntity;
import com.kpi.kpi_duties_db.service.DcDutiesQualificationRequirementsService;
import com.kpi.kpi_duties_db.shared.request.NewValueRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

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
    EntityManager em;

    @Autowired
    DcDutiesQualificationRequirementsService dcDutiesQualificationRequirementsService;

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
        dcDutiesQualificationRequirementsService.edit(entity);

        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Integer id) {

        dcDutiesQualificationRequirementsService.delete(id);

        return Response.ok().build();
    }
}
