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

    private Integer id;

    private Date start;

    private Date stop;

    private Boolean inKpi;

    private Boolean virtual;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getStop() {
        return stop;
    }

    public void setStop(Date stop) {
        this.stop = stop;
    }

    public Boolean getInKpi() {
        return inKpi;
    }

    public void setInKpi(Boolean inKpi) {
        this.inKpi = inKpi;
    }

    public Boolean getVirtual() {
        return virtual;
    }

    public void setVirtual(Boolean virtual) {
        this.virtual = virtual;
    }
}
