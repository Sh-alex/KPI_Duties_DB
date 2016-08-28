package com.kpi.kpi_duties_db.rest;

import com.kpi.kpi_duties_db.domain.DcDutiesPartitionEntity;
import com.kpi.kpi_duties_db.domain.RtDutiesEntity;
import com.kpi.kpi_duties_db.service.DcDutiesPartitionService;
import com.kpi.kpi_duties_db.service.RtDutiesService;
import com.kpi.kpi_duties_db.shared.addingoccupation.response.ListIdNameResponse;
import com.kpi.kpi_duties_db.shared.addingoccupation.response.support.IdNameResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 24.08.2016
 */
@Path("/adding")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Component
public class AddingOccupationController {

    @Autowired
    DcDutiesPartitionService dcDutiesPartitionEntityService;

    @Autowired
    RtDutiesService rtDutiesEntityService;

    @GET
    @Path("/occupGroup")
    public ListIdNameResponse getAllPartitionsNames() {

        List<DcDutiesPartitionEntity> all = dcDutiesPartitionEntityService.getAll();

        ListIdNameResponse response = new ListIdNameResponse();

        response.setIdNameResponses(new ArrayList<>());

        for (DcDutiesPartitionEntity entity : all) {
            IdNameResponse idNameResponse = new IdNameResponse();
            idNameResponse.setId(entity.getDcDutiesPartitionId());
            idNameResponse.setName(entity.getDcDutiesPartitionName());

            response.getIdNameResponses().add(idNameResponse);
        }
        return response;
    }

    @GET
    @Path("/clarifiedOccup")
    public ListIdNameResponse getAllDutiesNames() {

        List<RtDutiesEntity> all = rtDutiesEntityService.getAll();

        ListIdNameResponse response = new ListIdNameResponse();

        response.setIdNameResponses(new ArrayList<>());

        for (RtDutiesEntity entity : all) {
            IdNameResponse idNameResponse = new IdNameResponse();
            idNameResponse.setId(entity.getRtDutiesId());
            idNameResponse.setName(entity.getRtDutiesName());

            response.getIdNameResponses().add(idNameResponse);
        }
        return response;
    }

}
