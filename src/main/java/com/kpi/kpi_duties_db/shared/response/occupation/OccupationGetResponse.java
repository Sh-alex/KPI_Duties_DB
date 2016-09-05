package com.kpi.kpi_duties_db.shared.response.occupation;

import com.kpi.kpi_duties_db.domain.RtDutiesEntity;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 04.09.2016
 */

public class OccupationGetResponse {

    List<RtDutiesEntity> occupations;

    public List<RtDutiesEntity> getOccupations() {
        return occupations;
    }

    public void setOccupations(List<RtDutiesEntity> occupations) {
        this.occupations = occupations;
    }
}
