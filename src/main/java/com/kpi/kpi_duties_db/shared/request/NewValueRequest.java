package com.kpi.kpi_duties_db.shared.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 27.08.2016
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class NewValueRequest {

    private String newVal;

    public String getNewVal() {
        return newVal;
    }

    public void setNewVal(String newVal) {
        this.newVal = newVal;
    }
}
