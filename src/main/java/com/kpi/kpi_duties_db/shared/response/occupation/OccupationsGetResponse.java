package com.kpi.kpi_duties_db.shared.response.occupation;

import com.kpi.kpi_duties_db.shared.response.occupation.support.FoundOccupations;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 04.09.2016
 */

public class OccupationsGetResponse {

    private FoundOccupations foundOccupations;

    public FoundOccupations getFoundOccupations() {
        return foundOccupations;
    }

    public void setFoundOccupations(FoundOccupations foundOccupations) {
        this.foundOccupations = foundOccupations;
    }
}
