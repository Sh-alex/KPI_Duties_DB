package com.kpi.kpi_duties_db.shared.response.occupation.support;

import java.sql.Date;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 06.09.2016
 */

public class Requirement {

    private Integer id;

    private Date portionStartDate;

    private Date portionEndDate;

    private String text;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getPortionStartDate() {
        return portionStartDate;
    }

    public void setPortionStartDate(Date portionStartDate) {
        this.portionStartDate = portionStartDate;
    }

    public Date getPortionEndDate() {
        return portionEndDate;
    }

    public void setPortionEndDate(Date portionEndDate) {
        this.portionEndDate = portionEndDate;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
