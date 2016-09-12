package com.kpi.kpi_duties_db.rest;

import com.kpi.kpi_duties_db.domain.DcCodeZkpptrEntity;
import com.kpi.kpi_duties_db.service.DcCodeZkpptrService;
import com.kpi.kpi_duties_db.shared.request.NewValueRequest;
import com.kpi.kpi_duties_db.shared.response.IdNameListResponse;
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

@Path("/zkpptr_code")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Component
public class DcCodeZkpptrController {

    @Autowired
    DcCodeZkpptrService dcCodeZkpptrService;

    @GET
    public IdNameListResponse getAll() {

        List<DcCodeZkpptrEntity> all = dcCodeZkpptrService.getAll();

        IdNameListResponse response = new IdNameListResponse();

        response.setIdNameResponses(new ArrayList<>());

        for (DcCodeZkpptrEntity entity : all) {
            IdNameResponse idNameResponse = new IdNameResponse();
            idNameResponse.setId(entity.getId());
            idNameResponse.setName(entity.getName());

            response.getIdNameResponses().add(idNameResponse);
        }
        return response;
    }

    @POST
    public Response add(@NotNull NewValueRequest request) {

        DcCodeZkpptrEntity entity = new DcCodeZkpptrEntity();
        entity.setName(request.getNewVal());
        dcCodeZkpptrService.add(entity);

        return Response.ok().entity(entity).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@NotNull NewValueRequest request, @PathParam("id") Integer id) {

        DcCodeZkpptrEntity entity = new DcCodeZkpptrEntity();
        entity.setId(id);
        entity.setName(request.getNewVal());
        dcCodeZkpptrService.edit(entity);

        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Integer id) {

        dcCodeZkpptrService.delete(id);

        return Response.ok().build();
    }
}
