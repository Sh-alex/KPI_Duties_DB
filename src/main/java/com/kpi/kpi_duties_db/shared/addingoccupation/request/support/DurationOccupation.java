package com.kpi.kpi_duties_db.shared.addingoccupation.request.support;

import java.sql.Date;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 24.08.2016
 */

public class DurationOccupation {

    private Date creatingInStateDate;

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
