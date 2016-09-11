package com.kpi.kpi_duties_db.shared.message.utils;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 11.09.2016
 */

@JsonIgnoreProperties(ignoreUnknown = true)
public class MessageProperty {

    private String name;
    private String value;
    private String message;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
