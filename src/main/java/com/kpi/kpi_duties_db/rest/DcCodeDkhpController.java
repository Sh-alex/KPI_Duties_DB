package com.kpi.kpi_duties_db.rest;

import com.kpi.kpi_duties_db.domain.DcCodeDkhpEntity;
import com.kpi.kpi_duties_db.service.DcCodeDkhpService;
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
 * @since 25.08.2016
 */

@Path("/dkhp_code")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Component
public class DcCodeDkhpController {

    @Autowired
    DcCodeDkhpService dcCodeDkhpService;

    @GET
    public ListIdNameResponse getAll() {

        List<DcCodeDkhpEntity> all = dcCodeDkhpService.getAll();

        ListIdNameResponse response = new ListIdNameResponse();

        response.setIdNameResponses(new ArrayList<>());

        for (DcCodeDkhpEntity entity : all) {
            IdNameResponse idNameResponse = new IdNameResponse();
            idNameResponse.setId(entity.getId());
            idNameResponse.setName(entity.getName());

            response.getIdNameResponses().add(idNameResponse);
        }
        return response;
    }

    @POST
    public Response add(@NotNull NewValueRequest request) {

        DcCodeDkhpEntity entity = new DcCodeDkhpEntity();
        entity.setName(request.getNewVal());
        dcCodeDkhpService.add(entity);

        return Response.ok().entity(entity).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@NotNull NewValueRequest request, @PathParam("id") Integer id) {

        DcCodeDkhpEntity entity = new DcCodeDkhpEntity();
        entity.setId(id);
        entity.setName(request.getNewVal());
        dcCodeDkhpService.edit(entity);

        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Integer id) {

        dcCodeDkhpService.delete(id);

        return Response.ok().build();
    }

}
