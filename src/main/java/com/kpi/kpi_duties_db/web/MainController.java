package com.kpi.kpi_duties_db.web;

import com.kpi.kpi_duties_db.service.impl.DcDutiesNameEntityServiceImpl;
import com.kpi.kpi_duties_db.service.impl.DcDutiesPartitionEntityServiceImpl;
import com.kpi.kpi_duties_db.service.impl.RtDutiesEntityServiceImpl;
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

    @Autowired
    DcDutiesNameEntityServiceImpl dcDutiesNameEntityService;

    @Autowired
    RtDutiesEntityServiceImpl rtDutiesEntityService;

    @RequestMapping(value = "/*", method = RequestMethod.GET)
    public String goIndex() {

        return "index";
    }

    @RequestMapping(value = "/api/occupGroup", method = RequestMethod.GET)
    @ResponseBody
    public List getAllPartitionsNames() {


        return dcDutiesPartitionEntityService.getAllDutiesNames();
    }

    @RequestMapping(value = "/api/clarifiedOccup", method = RequestMethod.GET)
    @ResponseBody
    public List getAllDutiesNames() {


        return dcDutiesNameEntityService.getAllDutiesNames();
    }

    @RequestMapping(value = "/api/clarification", method = RequestMethod.GET)
    @ResponseBody
    public List getAllRtDutiesNames() {

        return rtDutiesEntityService.getAllRtDutiesNames();
    }

}
