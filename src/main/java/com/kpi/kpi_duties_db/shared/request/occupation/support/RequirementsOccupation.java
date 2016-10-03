package com.kpi.kpi_duties_db.shared.request.occupation.support;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Date;
/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 01.09.2016
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class RequirementsOccupation {

    private Integer idText;

    private String text;

    private Integer idDates;

    @JsonProperty("portionStartDate")
    private Date dateStart;

    @JsonProperty("portionEndDate")
    private Date dateEnd;

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

    public Date getDateStart() {
        return dateStart;
    }

    public void setDateStart(Date dateStart) {
        this.dateStart = dateStart;
    }

    public Date getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(Date dateEnd) {
        this.dateEnd = dateEnd;
    }
}
