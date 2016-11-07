package com.kpi.kpi_duties_db.shared.response.support;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 24.08.2016
 */

public class IdNameResponse {

    private Integer id;

    @JsonProperty("textValue")
    private String name;

    @JsonProperty("usingOccupations")
    private List<Integer> usingOccupationsId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Integer> getUsingOccupationsId() {
        return usingOccupationsId;
    }

    public void setUsingOccupationsId(List<Integer> usingOccupationsId) {
        this.usingOccupationsId = usingOccupationsId;
    }
}
