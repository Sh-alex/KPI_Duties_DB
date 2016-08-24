package com.kpi.kpi_duties_db.web;

import com.kpi.kpi_duties_db.domain.DcDutiesNameEntity;
import com.kpi.kpi_duties_db.domain.DcDutiesPartitionEntity;
import com.kpi.kpi_duties_db.domain.RtDutiesEntity;
import com.kpi.kpi_duties_db.service.DcDutiesNameEntityService;
import com.kpi.kpi_duties_db.service.DcDutiesPartitionEntityService;
import com.kpi.kpi_duties_db.service.RtDutiesEntityService;
import com.kpi.kpi_duties_db.shared.response.ListIdNameResponse;
import com.kpi.kpi_duties_db.shared.response.support.IdNameResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


@Controller
public class MainController {

    @Autowired
    EntityManager em;

    @Autowired
    DcDutiesPartitionEntityService dcDutiesPartitionEntityService;

    @Autowired
    DcDutiesNameEntityService dcDutiesNameEntityService;

    @Autowired
    RtDutiesEntityService rtDutiesEntityService;

    @RequestMapping(value = "/*", method = RequestMethod.GET)
    public String goIndex() {

        return "index";
    }

    @RequestMapping(value = "/api/occupGroup", method = RequestMethod.GET)
    @ResponseBody
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

    @RequestMapping(value = "/api/clarifiedOccup", method = RequestMethod.GET)
    @ResponseBody
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

    @RequestMapping(value = "/api/clarification", method = RequestMethod.GET)
    @ResponseBody
    public ListIdNameResponse getAllRtDutiesNames() {

        List<DcDutiesNameEntity> all = dcDutiesNameEntityService.getAll();

        ListIdNameResponse response = new ListIdNameResponse();

        response.setIdNameResponses(new ArrayList<>());

        for (DcDutiesNameEntity entity : all) {
            IdNameResponse idNameResponse = new IdNameResponse();
            idNameResponse.setId(entity.getId());
            idNameResponse.setName(entity.getName());

            response.getIdNameResponses().add(idNameResponse);
        }
        return response;
    }

}
