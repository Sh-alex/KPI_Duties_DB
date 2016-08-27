package com.kpi.kpi_duties_db.shared.addingoccupation.response;

import com.kpi.kpi_duties_db.shared.addingoccupation.response.support.IdNameResponse;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 24.08.2016
 */

public class ListIdNameResponse {

    List<IdNameResponse> idNameResponses;

    public List<IdNameResponse> getIdNameResponses() {
        return idNameResponses;
    }

    public void setIdNameResponses(List<IdNameResponse> idNameResponses) {
        this.idNameResponses = idNameResponses;
    }
}
