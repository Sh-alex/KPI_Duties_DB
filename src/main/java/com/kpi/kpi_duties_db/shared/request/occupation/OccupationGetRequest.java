package com.kpi.kpi_duties_db.shared.request.occupation;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Date;
import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 04.09.2016
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class OccupationGetRequest {

    private List<String> searchType;

    @JsonProperty("occupGroupVal")
    private List<Integer> dcDutiesPartitionId;

    @JsonProperty("searchText")
    private List<String> rtDutiesName;

    @JsonProperty("searchTags")
    private List<String> dcDutiesNames;

    private List<Date> creatingInStateDate_from;

    private List<Date> creatingInStateDate_to;

    private List<Date> cancelingInStateDate_from;

    private List<Date> cancelingInStateDate_to;

    private List<Date> creatingInKPIDate_from;

    private List<Date> creatingInKPIDate_to;

    private List<Date> cancelingInKPIDate_from;

    private List<Date> cancelingInKPIDate_to;


    public List<String> getSearchType() {
        return searchType;
    }

    public void setSearchType(List<String> searchType) {
        this.searchType = searchType;
    }

    public List<Integer> getDcDutiesPartitionId() {
        return dcDutiesPartitionId;
    }

    public void setDcDutiesPartitionId(List<Integer> dcDutiesPartitionId) {
        this.dcDutiesPartitionId = dcDutiesPartitionId;
    }

    public List<String> getRtDutiesName() {
        return rtDutiesName;
    }

    public void setRtDutiesName(List<String> rtDutiesName) {
        this.rtDutiesName = rtDutiesName;
    }

    public List<String> getDcDutiesNames() {
        return dcDutiesNames;
    }

    public void setDcDutiesNames(List<String> dcDutiesNames) {
        this.dcDutiesNames = dcDutiesNames;
    }

    public List<Date> getCreatingInStateDate_from() {
        return creatingInStateDate_from;
    }

    public void setCreatingInStateDate_from(List<Date> creatingInStateDate_from) {
        this.creatingInStateDate_from = creatingInStateDate_from;
    }

    public List<Date> getCreatingInStateDate_to() {
        return creatingInStateDate_to;
    }

    public void setCreatingInStateDate_to(List<Date> creatingInStateDate_to) {
        this.creatingInStateDate_to = creatingInStateDate_to;
    }

    public List<Date> getCancelingInStateDate_from() {
        return cancelingInStateDate_from;
    }

    public void setCancelingInStateDate_from(List<Date> cancelingInStateDate_from) {
        this.cancelingInStateDate_from = cancelingInStateDate_from;
    }

    public List<Date> getCancelingInStateDate_to() {
        return cancelingInStateDate_to;
    }

    public void setCancelingInStateDate_to(List<Date> cancelingInStateDate_to) {
        this.cancelingInStateDate_to = cancelingInStateDate_to;
    }

    public List<Date> getCreatingInKPIDate_from() {
        return creatingInKPIDate_from;
    }

    public void setCreatingInKPIDate_from(List<Date> creatingInKPIDate_from) {
        this.creatingInKPIDate_from = creatingInKPIDate_from;
    }

    public List<Date> getCreatingInKPIDate_to() {
        return creatingInKPIDate_to;
    }

    public void setCreatingInKPIDate_to(List<Date> creatingInKPIDate_to) {
        this.creatingInKPIDate_to = creatingInKPIDate_to;
    }

    public List<Date> getCancelingInKPIDate_from() {
        return cancelingInKPIDate_from;
    }

    public void setCancelingInKPIDate_from(List<Date> cancelingInKPIDate_from) {
        this.cancelingInKPIDate_from = cancelingInKPIDate_from;
    }

    public List<Date> getCancelingInKPIDate_to() {
        return cancelingInKPIDate_to;
    }

    public void setCancelingInKPIDate_to(List<Date> cancelingInKPIDate_to) {
        this.cancelingInKPIDate_to = cancelingInKPIDate_to;
    }
}
