package com.kpi.kpi_duties_db.shared.response.occupation.support;

import java.sql.Date;
import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 06.09.2016
 */

public class Requirement {

    private Integer idText;

    private String text;

    private Integer idDates;

    private Date portionStartDate;

    private Date portionEndDate;

    private List<String> usingOccupations;

    public Integer getIdText() {
        return idText;
    }

    public void setIdText(Integer idText) {
        this.idText = idText;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getIdDates() {
        return idDates;
    }

    public void setIdDates(Integer idDates) {
        this.idDates = idDates;
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

    public List<String> getUsingOccupations() {
        return usingOccupations;
    }

    public void setUsingOccupations(List<String> usingOccupations) {
        this.usingOccupations = usingOccupations;
    }
}
