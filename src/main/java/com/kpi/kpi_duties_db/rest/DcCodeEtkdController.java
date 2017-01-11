package com.kpi.kpi_duties_db.rest;

import com.kpi.kpi_duties_db.domain.dcduties.DcCodeEtkdEntity;
import com.kpi.kpi_duties_db.service.DcCodeEtkdService;
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
 * @since 25.08.2016
 */

@Path("/code/etkd")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Component
public class DcCodeEtkdController {

    @Autowired
    private DcCodeEtkdService dcCodeEtkdService;

    @Autowired
    private IdNameConverter idNameConverter;

    @Autowired
    private UsingOccupations usingOccupations;

    @GET
    public Response getAll(@QueryParam("filterStr") String filterStr, @QueryParam("sortDirection") String sortDirection, @QueryParam("offset") Integer offset, @QueryParam("limit") Integer limit) {

        List<DcCodeEtkdEntity> all = dcCodeEtkdService.findByParams(filterStr, sortDirection, offset, limit);

        IdNameListResponse response = idNameConverter.toIdNameListResponseFromEntityList(all);
        response = usingOccupations.findUsingOccupationsIdForCode(response, "codeETKDId");
        response.setResultsOveralSize(dcCodeEtkdService.findByParams(filterStr, sortDirection, 0, 0).size());

        return Response.ok(response).build();
    }

    @POST
    public Response add(@NotNull NewValueRequest request) {

        DcCodeEtkdEntity entity = new DcCodeEtkdEntity();
        entity.setName(request.getNewVal());
        dcCodeEtkdService.add(entity);

        return Response.ok().entity(entity).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@NotNull NewValueRequest request, @PathParam("id") Integer id) {

        DcCodeEtkdEntity entity = new DcCodeEtkdEntity();
        entity.setId(id);
        entity.setName(request.getNewVal());
        dcCodeEtkdService.update(entity);

        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Integer id) {

        dcCodeEtkdService.delete(id);

        return Response.ok().build();
    }
}
