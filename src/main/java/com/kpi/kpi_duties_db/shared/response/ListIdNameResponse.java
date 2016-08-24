package com.kpi.kpi_duties_db.shared.response;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 24.08.2016
 */

public class ListIdNameResponse {

    List<com.kpi.kpi_duties_db.shared.response.support.IdNameResponse> idNameResponses;

    public List<com.kpi.kpi_duties_db.shared.response.support.IdNameResponse> getIdNameResponses() {
        return idNameResponses;
    }

    public void setIdNameResponses(List<com.kpi.kpi_duties_db.shared.response.support.IdNameResponse> idNameResponses) {
        this.idNameResponses = idNameResponses;
    }
}
