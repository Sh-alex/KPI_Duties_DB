package com.kpi.kpi_duties_db.shared.addingoccupation.request.support;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 24.08.2016
 */

public class FeaturesAddOccupation {

    @JsonProperty("isIndependent")
    private Boolean isIndependent;

    @JsonProperty("isVirtual")
    private Boolean isVirtual;

}
