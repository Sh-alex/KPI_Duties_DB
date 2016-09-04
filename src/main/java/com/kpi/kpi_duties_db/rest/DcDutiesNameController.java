package com.kpi.kpi_duties_db.rest;

import com.kpi.kpi_duties_db.domain.DcDutiesNameEntity;
import com.kpi.kpi_duties_db.service.DcDutiesNameService;
import com.kpi.kpi_duties_db.shared.request.NewValueRequest;
import com.kpi.kpi_duties_db.shared.response.ListIdNameResponse;
import com.kpi.kpi_duties_db.shared.response.support.IdNameResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 27.08.2016
 */

@Path("/clarification")
@Produces( MediaType.APPLICATION_JSON )
@Consumes( MediaType.APPLICATION_JSON )
@Component
public class DcDutiesNameController {

    @Autowired
    DcDutiesNameService dcDutiesNameEntityService;

    @GET
    public ListIdNameResponse getAllRtDutiesNames() {

        List<DcDutiesNameEntity> all = dcDutiesNameEntityService.getAll();

        ListIdNameResponse response = new ListIdNameResponse();

        response.setIdNameResponses(new ArrayList<>());

        for (DcDutiesNameEntity entity : all) {
            IdNameResponse idNameResponse = new IdNameResponse();
            idNameResponse.setId(entity.getId());
            idNameResponse.setName(entity.getName());

            response.getIdNameResponses().add(idNameResponse);
        }
        return response;
    }

    @POST
    public Response add(@NotNull NewValueRequest request) {

        DcDutiesNameEntity entity = new DcDutiesNameEntity();
        entity.setName(request.getNewVal());
        dcDutiesNameEntityService.add(entity);

        return Response.ok().entity(entity).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@NotNull NewValueRequest request, @PathParam("id") Integer id) {

        DcDutiesNameEntity entity = new DcDutiesNameEntity();
        entity.setId(id);
        entity.setName(request.getNewVal());
        dcDutiesNameEntityService.edit(entity);

        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Integer id) {

        dcDutiesNameEntityService.delete(id);

        return Response.ok().build();
    }
}
