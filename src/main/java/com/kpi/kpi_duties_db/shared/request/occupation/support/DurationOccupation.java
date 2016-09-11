package com.kpi.kpi_duties_db.shared.request.occupation.support;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.validation.constraints.NotNull;
import java.sql.Date;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 24.08.2016
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class DurationOccupation {

    @NotNull
    private Date creatingInStateDate;

    @NotNull
    private Date creatingInKPIDate;

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
}
