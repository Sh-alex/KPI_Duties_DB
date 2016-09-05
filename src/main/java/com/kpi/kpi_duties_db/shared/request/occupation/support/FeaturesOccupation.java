package com.kpi.kpi_duties_db.shared.request.occupation.support;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 24.08.2016
 */

public class FeaturesOccupation {

    @JsonProperty("isIndependent")
    private Boolean isIndependent;

    @JsonProperty("isVirtual")
    private Boolean isVirtual;

    public Boolean getIndependent() {
        return isIndependent;
    }

    public void setIndependent(Boolean independent) {
        isIndependent = independent;
    }

    public Boolean getVirtual() {
        return isVirtual;
    }

    public void setVirtual(Boolean virtual) {
        isVirtual = virtual;
    }
}
