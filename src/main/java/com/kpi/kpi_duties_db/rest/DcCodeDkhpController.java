package com.kpi.kpi_duties_db.rest;

import com.kpi.kpi_duties_db.domain.DcCodeDkhpEntity;
import com.kpi.kpi_duties_db.service.DcCodeDkhpService;
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

@Path("/code/dkhp")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Component
public class DcCodeDkhpController {

    @Autowired
    private DcCodeDkhpService dcCodeDkhpService;

    @Autowired
    private IdNameConverter idNameConverter;

    @GET
    public Response getAll() {

        List<DcCodeDkhpEntity> all = dcCodeDkhpService.getAll();
        IdNameListResponse response = idNameConverter.toIdNameListResponseFromEntityList(all);

        return Response.ok(response).build();
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
        dcCodeDkhpService.update(entity);

        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Integer id) {

        dcCodeDkhpService.delete(id);

        return Response.ok().build();
    }

}
