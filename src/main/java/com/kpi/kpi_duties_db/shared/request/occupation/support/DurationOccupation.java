package com.kpi.kpi_duties_db.shared.request.occupation.support;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.sql.Date;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 24.08.2016
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class DurationOccupation {

    private Date creatingInStateDate;

    private Date cancelingInStateDate;

    private Date creatingInKPIDate;

    private Date cancelingInKPIDate;


    public Date getCreatingInStateDate() {
        return creatingInStateDate;
    }

    public void setCreatingInStateDate(Date creatingInStateDate) {
        this.creatingInStateDate = creatingInStateDate;
    }

    public Date getCreatingInKPIDate() {
        return creatingInKPIDate;
    }

    public void setCreatingInKPIDate(Date creatingInKPIDate) {
        this.creatingInKPIDate = creatingInKPIDate;
    }

    public Date getCancelingInStateDate() {
        return cancelingInStateDate;
    }

    public void setCancelingInStateDate(Date cancelingInStateDate) {
        this.cancelingInStateDate = cancelingInStateDate;
    }

    public Date getCancelingInKPIDate() {
        return cancelingInKPIDate;
    }

    public void setCancelingInKPIDate(Date cancelingInKPIDate) {
        this.cancelingInKPIDate = cancelingInKPIDate;
    }
}
