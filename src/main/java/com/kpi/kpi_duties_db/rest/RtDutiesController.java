package com.kpi.kpi_duties_db.rest;

import org.springframework.stereotype.Component;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 28.08.2016
 */

@Path("/occupations")
@Produces( MediaType.APPLICATION_JSON )
@Consumes( MediaType.APPLICATION_JSON )
@Component
public class RtDutiesController {

    @POST
    public Response add() {
        //TODO:
        return Response.ok().build();
    }
}
