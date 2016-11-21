package com.kpi.kpi_duties_db.rest;

import com.kpi.kpi_duties_db.domain.DcCodeKpEntity;
import com.kpi.kpi_duties_db.service.DcCodeKpService;
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

@Path("/code/kp")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Component
public class DcCodeKpController {

    @Autowired
    private DcCodeKpService dcCodeKpEntityService;

    @Autowired
    private IdNameConverter idNameConverter;

    @GET
    public Response getAll() {

        List<DcCodeKpEntity> all = dcCodeKpEntityService.getAll();
        IdNameListResponse response = idNameConverter.toIdNameListResponseFromEntityList(all);

        return Response.ok(response).build();
    }

    @POST
    public Response add(@NotNull NewValueRequest request) {

        DcCodeKpEntity entity = new DcCodeKpEntity();
        entity.setName(request.getNewVal());
        dcCodeKpEntityService.add(entity);

        return Response.ok().entity(entity).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@NotNull NewValueRequest request, @PathParam("id") Integer id) {

        DcCodeKpEntity entity = new DcCodeKpEntity();
        entity.setId(id);
        entity.setName(request.getNewVal());
        dcCodeKpEntityService.update(entity);

        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Integer id) {

        dcCodeKpEntityService.delete(id);

        return Response.ok().build();
    }
}
