package com.kpi.kpi_duties_db.rest;

import com.kpi.kpi_duties_db.domain.DcDutiesTasksAndResponsibilitiesEntity;
import com.kpi.kpi_duties_db.service.DcDutiesTaskAndResponsibilitiesService;
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

@Path("/responsibilities")
@Produces( MediaType.APPLICATION_JSON )
@Consumes( MediaType.APPLICATION_JSON )
@Component
public class DcDutiesResponsibilitiesController {

    @Autowired
    private DcDutiesTaskAndResponsibilitiesService dcDutiesTaskAndResponsibilitiesService;

    @Autowired
    private IdNameConverter idNameConverter;

    @Autowired
    private UsingOccupations usingOccupations;

    @GET
    public Response getAll() {

        List<DcDutiesTasksAndResponsibilitiesEntity> all = dcDutiesTaskAndResponsibilitiesService.getAll();
        IdNameListResponse response = idNameConverter.toIdNameListResponseFromEntityList(all);
        response = usingOccupations.findUsingOccupationsIdForRtDutiesTaskAndResponsibilities(response);

        return Response.ok(response).build();
    }

    @POST
    public Response add(@NotNull NewValueRequest request) {
        DcDutiesTasksAndResponsibilitiesEntity entity = new DcDutiesTasksAndResponsibilitiesEntity();

        entity.setText(request.getNewVal());
        dcDutiesTaskAndResponsibilitiesService.add(entity);

        return Response.ok().entity(entity).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@NotNull NewValueRequest request, @PathParam("id") Integer id) {

        DcDutiesTasksAndResponsibilitiesEntity entity = new DcDutiesTasksAndResponsibilitiesEntity();
        entity.setId(id);
        entity.setText(request.getNewVal());
        dcDutiesTaskAndResponsibilitiesService.update(entity);

        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Integer id) {

        dcDutiesTaskAndResponsibilitiesService.delete(id);

        return Response.ok().build();
    }
}
