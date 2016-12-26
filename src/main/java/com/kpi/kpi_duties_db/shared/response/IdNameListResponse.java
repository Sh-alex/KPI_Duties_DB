package com.kpi.kpi_duties_db.shared.response;

import com.kpi.kpi_duties_db.shared.response.support.IdNameResponse;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 24.08.2016
 */

public class IdNameListResponse {

    private List<IdNameResponse> idNameResponses;

    private Integer resultsOveralSize;

    public List<IdNameResponse> getIdNameResponses() {
        return idNameResponses;
    }

    public void setIdNameResponses(List<IdNameResponse> idNameResponses) {
        this.idNameResponses = idNameResponses;
    }

    public Integer getResultsOveralSize() {
        return resultsOveralSize;
    }

    public void setResultsOveralSize(Integer resultsOveralSize) {
        this.resultsOveralSize = resultsOveralSize;
    }
}
