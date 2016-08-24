package com.kpi.kpi_duties_db.web;

import com.kpi.kpi_duties_db.domain.DcCodeKpEntity;
import com.kpi.kpi_duties_db.service.DcCodeKpService;
import com.kpi.kpi_duties_db.shared.addingoccupation.response.ListIdNameResponse;
import com.kpi.kpi_duties_db.shared.addingoccupation.response.support.IdNameResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 25.08.2016
 */

@Controller
public class DcCodeKpController {

    @Autowired
    DcCodeKpService dcCodeKpEntityService;

    @RequestMapping(value = "/api/kp_code/gets", method = RequestMethod.GET)
    @ResponseBody
    public ListIdNameResponse getAll() {

        List<DcCodeKpEntity> all = dcCodeKpEntityService.getAll();

        ListIdNameResponse response = new ListIdNameResponse();

        response.setIdNameResponses(new ArrayList<>());

        for (DcCodeKpEntity entity : all) {
            IdNameResponse idNameResponse = new IdNameResponse();
            idNameResponse.setId(entity.getId());
            idNameResponse.setName(entity.getName());

            response.getIdNameResponses().add(idNameResponse);
        }
        return response;
    }
}
