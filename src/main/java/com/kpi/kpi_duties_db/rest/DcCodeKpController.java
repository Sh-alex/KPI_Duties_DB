package com.kpi.kpi_duties_db.rest;

import com.kpi.kpi_duties_db.domain.DcCodeKpEntity;
import com.kpi.kpi_duties_db.service.DcCodeKpService;
import com.kpi.kpi_duties_db.shared.addingoccupation.response.ListIdNameResponse;
import com.kpi.kpi_duties_db.shared.addingoccupation.response.support.IdNameResponse;
import com.kpi.kpi_duties_db.shared.request.NewValueRequest;
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

@Path("/kp_code")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Component
public class DcCodeKpController {

    @Autowired
    DcCodeKpService dcCodeKpEntityService;

    @GET
    @Path("/gets")
    public Response getAll() {

        List<DcCodeKpEntity> all = dcCodeKpEntityService.getAll();

        ListIdNameResponse response = new ListIdNameResponse();

        response.setIdNameResponses(new ArrayList<>());

        for (DcCodeKpEntity entity : all) {
            IdNameResponse idNameResponse = new IdNameResponse();
            idNameResponse.setId(entity.getId());
            idNameResponse.setName(entity.getName());

            response.getIdNameResponses().add(idNameResponse);
        }
        return Response.ok(response).build();
    }

    @POST
    public Response add(@NotNull NewValueRequest request) {

        DcCodeKpEntity entity = new DcCodeKpEntity();
        entity.setName(request.getNewVal());
        dcCodeKpEntityService.add(entity);

        return Response.ok().entity(entity).build();
    }
}