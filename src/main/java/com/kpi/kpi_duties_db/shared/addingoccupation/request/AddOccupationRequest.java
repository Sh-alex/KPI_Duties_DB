package com.kpi.kpi_duties_db.shared.addingoccupation.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kpi.kpi_duties_db.shared.addingoccupation.request.support.DurationAddOccupation;
import com.kpi.kpi_duties_db.shared.addingoccupation.request.support.FeaturesAddOccupation;
import com.kpi.kpi_duties_db.shared.addingoccupation.request.support.NameAddOccupation;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 24.08.2016
 */

public class AddOccupationRequest {

    @JsonProperty("name")
    private NameAddOccupation nameAddOccupation;

    @JsonProperty("features")
    private FeaturesAddOccupation featuresAddOccupation;

    @JsonProperty("duration")
    private DurationAddOccupation durationAddOccupation;
}
