package com.kpi.kpi_duties_db.shared.request.occupation.support;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 24.08.2016
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class NameOccupation {

    @JsonProperty("occupationGroup")
    @NotNull
    private Integer dcDutiesPartitionId;

    @JsonProperty("clarifiedOccup")
    private Integer rtDutiesParentId;

    @JsonProperty("clarification")
    private Integer dcDutiesNameId;

    @JsonProperty("occupationName")
    private String rtDutiesName;

    @JsonProperty("occupationNameMin")
    private String rtDutiesNameShort;

    public Integer getDcDutiesPartitionId() {
        return dcDutiesPartitionId;
    }

    public void setDcDutiesPartitionId(Integer dcDutiesPartitionId) {
        this.dcDutiesPartitionId = dcDutiesPartitionId;
    }

    public Integer getRtDutiesParentId() {
        return rtDutiesParentId;
    }

    public void setRtDutiesParentId(Integer rtDutiesParentId) {
        this.rtDutiesParentId = rtDutiesParentId;
    }

    public Integer getDcDutiesNameId() {
        return dcDutiesNameId;
    }

    public void setDcDutiesNameId(Integer dcDutiesNameId) {
        this.dcDutiesNameId = dcDutiesNameId;
    }

    public String getRtDutiesName() {
        return rtDutiesName;
    }

    public void setRtDutiesName(String rtDutiesName) {
        this.rtDutiesName = rtDutiesName;
    }

    public String getRtDutiesNameShort() {
        return rtDutiesNameShort;
    }

    public void setRtDutiesNameShort(String rtDutiesNameShort) {
        this.rtDutiesNameShort = rtDutiesNameShort;
    }
}
