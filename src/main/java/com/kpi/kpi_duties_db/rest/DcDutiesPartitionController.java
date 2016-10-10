package com.kpi.kpi_duties_db.rest;

import com.kpi.kpi_duties_db.domain.DcDutiesPartitionEntity;
import com.kpi.kpi_duties_db.service.DcDutiesPartitionService;
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

    @POST
    public Response add(@NotNull NewValueRequest request){

        DcDutiesPartitionEntity entity = new DcDutiesPartitionEntity();
        entity.setName(request.getNewVal());

        dcDutiesPartitionEntityService.add(entity);

        return Response.ok().entity(entity).build();
    }

    @GET
    public Response getAll() {

        List<DcDutiesPartitionEntity> all = dcDutiesPartitionEntityService.getAll();
        IdNameListResponse response = idNameConverter.toIdNameListResponseFromEntityList(all);

        return Response.ok(response).build();
    }
}
