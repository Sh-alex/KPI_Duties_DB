package com.kpi.kpi_duties_db.rest;

import com.kpi.kpi_duties_db.domain.dcduties.DcDutiesPartitionEntity;
import com.kpi.kpi_duties_db.service.DcDutiesPartitionService;
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
 * @since 12.09.2016
 */

@Path("/partition")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Component
public class DcDutiesPartitionController {

    @Autowired
    private DcDutiesPartitionService dcDutiesPartitionEntityService;

    @Autowired
    private IdNameConverter idNameConverter;

    @Autowired
    private UsingOccupations usingOccupations;

    @GET
    public Response getAll(@QueryParam("filterStr") String filterStr, @QueryParam("sortDirection") String sortDirection, @QueryParam("offset") Integer offset, @QueryParam("limit") Integer limit) {

        List<DcDutiesPartitionEntity> all = dcDutiesPartitionEntityService.findByParams(filterStr, sortDirection, offset, limit);

        IdNameListResponse response = idNameConverter.toIdNameListResponseFromEntityList(all);
        response = usingOccupations.findUsingOccupationsIdForDcDutiesPartition(response);

        return Response.ok(response).build();
    }

    @POST
    public Response add(@NotNull NewValueRequest request){

        DcDutiesPartitionEntity entity = new DcDutiesPartitionEntity();
        entity.setName(request.getNewVal());

        dcDutiesPartitionEntityService.add(entity);

        return Response.ok().entity(entity).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@NotNull NewValueRequest request, @PathParam("id") Integer id) {

        DcDutiesPartitionEntity entity = new DcDutiesPartitionEntity();
        entity.setId(id);
        entity.setName(request.getNewVal());
        dcDutiesPartitionEntityService.update(entity);

        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Integer id) {

        dcDutiesPartitionEntityService.delete(id);

        return Response.ok().build();
    }
}
