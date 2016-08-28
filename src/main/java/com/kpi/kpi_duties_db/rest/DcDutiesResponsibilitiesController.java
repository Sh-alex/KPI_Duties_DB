package com.kpi.kpi_duties_db.rest;

import com.kpi.kpi_duties_db.domain.DcDutiesTasksAndResponsibilitiesEntity;
import com.kpi.kpi_duties_db.service.DcDutiesTaskAndResponsibilitiesService;
import com.kpi.kpi_duties_db.shared.request.NewValueRequest;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

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
    DcDutiesTaskAndResponsibilitiesService dcDutiesTaskAndResponsibilitiesService;

    @Autowired
    EntityManager em;

    @POST
    public Response add(@NotNull NewValueRequest request) {
        //TODO: Пофіксить цей костиль і додати автоінкремент для сутності
        DcDutiesTasksAndResponsibilitiesEntity entity = new DcDutiesTasksAndResponsibilitiesEntity();

        Session session = ((Session) em.getDelegate()).getSessionFactory().openSession();

        Criteria criteria = session.createCriteria(DcDutiesTasksAndResponsibilitiesEntity.class);
        criteria.setProjection(Projections.max("id"));

        Integer entityMaxId = (Integer)criteria.uniqueResult();

        entity.setText(request.getNewVal());
        entity.setId(++entityMaxId);
        dcDutiesTaskAndResponsibilitiesService.add(entity);

        return Response.ok().entity(entity).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@NotNull NewValueRequest request, @PathParam("id") Integer id) {

        DcDutiesTasksAndResponsibilitiesEntity entity = new DcDutiesTasksAndResponsibilitiesEntity();
        entity.setId(id);
        entity.setText(request.getNewVal());
        dcDutiesTaskAndResponsibilitiesService.edit(entity);

        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Integer id) {

        dcDutiesTaskAndResponsibilitiesService.delete(id);

        return Response.ok().build();
    }
}
