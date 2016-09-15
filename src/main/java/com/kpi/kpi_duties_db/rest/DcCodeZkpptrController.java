package com.kpi.kpi_duties_db.rest;

import com.kpi.kpi_duties_db.domain.DcCodeZkpptrEntity;
import com.kpi.kpi_duties_db.service.DcCodeZkpptrService;
import com.kpi.kpi_duties_db.service.utils.converters.idname.IdNameConverter;
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
 * @since 25.08.2016
 */

@Path("/code/zkpptr")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Component
public class DcCodeZkpptrController {

    @Autowired
    private DcCodeZkpptrService dcCodeZkpptrService;

    @Autowired
    private IdNameConverter idNameConverter;

    @GET
    public Response getAll() {

        List<DcCodeZkpptrEntity> all = dcCodeZkpptrService.getAll();
        IdNameListResponse response = idNameConverter.toIdNameListResponseFromEntityList(all);

        return Response.ok(response).build();
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
        dcCodeZkpptrService.update(entity);

        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Integer id) {

        dcCodeZkpptrService.delete(id);

        return Response.ok().build();
    }
}
