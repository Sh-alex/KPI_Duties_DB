package com.kpi.kpi_duties_db.web;

import com.kpi.kpi_duties_db.domain.DcDutiesPartitionEntity;
import com.kpi.kpi_duties_db.service.impl.DcDutiesPartitionEntityServiceImpl;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.persistence.EntityManager;
import java.util.List;


@Controller
public class MainController {

    @Autowired
    EntityManager em;

    @Autowired
    DcDutiesPartitionEntityServiceImpl dcDutiesPartitionEntityService;

    @RequestMapping(value = "/*", method = RequestMethod.GET)
    public String goIndex() {

        return "index";
    }
    @RequestMapping(value = "/api/occupGroup", method = RequestMethod.GET)
    @ResponseBody
    public List getAllPartitions() {

        Session session = ((Session) em.getDelegate()).getSessionFactory().openSession();

        Criteria criteria = session.createCriteria(DcDutiesPartitionEntity.class);

        criteria.setProjection(Projections.property("dcDutiesPartitionName"));

        return criteria.list();
    }

}
