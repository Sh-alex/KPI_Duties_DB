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

    @JsonProperty("occupIds")
    private List<String> idList;

    private List<String> searchType;

    @JsonProperty("filterStr")
    private List<String> rtDutiesName;

    @JsonProperty("occupGroupVal")
    private List<String> dcDutiesPartitionIdList;

    @JsonProperty("searchTags")
    private List<String> rtDutiesNameTags;

    private List<Date> startFrom;

    private List<Date> startTo;

    private List<Date> stopFrom;

    private List<Date> stopTo;

    private List<String> inKpi;

    private List<Integer> offset;

    private List<Integer> limit;

    private List<String> sortField ;

    private List<String> sortDirection  ;

    public List<String> getIdList() {
        return idList;
    }

    public void setIdList(List<String> idList) {
        this.idList = idList;
    }

    public List<String> getSearchType() {
        return searchType;
    }

    public void setSearchType(List<String> searchType) {
        this.searchType = searchType;
    }

    public List<String> getDcDutiesPartitionIdList() {
        return dcDutiesPartitionIdList;
    }

    public void setDcDutiesPartitionIdList(List<String> dcDutiesPartitionIdList) {
        this.dcDutiesPartitionIdList = dcDutiesPartitionIdList;
    }

    public List<String> getRtDutiesName() {
        return rtDutiesName;
    }

    public void setRtDutiesName(List<String> rtDutiesName) {
        this.rtDutiesName = rtDutiesName;
    }

    public List<String> getRtDutiesNameTags() {
        return rtDutiesNameTags;
    }

    public void setRtDutiesNameTags(List<String> rtDutiesNameTags) {
        this.rtDutiesNameTags = rtDutiesNameTags;
    }

    public List<Date> getStartFrom() {
        return startFrom;
    }

    public void setStartFrom(List<Date> startFrom) {
        this.startFrom = startFrom;
    }

    public List<Date> getStartTo() {
        return startTo;
    }

    public void setStartTo(List<Date> startTo) {
        this.startTo = startTo;
    }

    public List<Date> getStopFrom() {
        return stopFrom;
    }

    public void setStopFrom(List<Date> stopFrom) {
        this.stopFrom = stopFrom;
    }

    public List<Date> getStopTo() {
        return stopTo;
    }

    public void setStopTo(List<Date> stopTo) {
        this.stopTo = stopTo;
    }

    public List<String> getInKpi() {
        return inKpi;
    }

    public void setInKpi(List<String> inKpi) {
        this.inKpi = inKpi;
    }

    public List<Integer> getOffset() {
        return offset;
    }

    public void setOffset(List<Integer> offset) {
        this.offset = offset;
    }

    public List<Integer> getLimit() {
        return limit;
    }

    public void setLimit(List<Integer> limit) {
        this.limit = limit;
    }

    public List<String> getSortField() {
        return sortField;
    }

    public void setSortField(List<String> sortField) {
        this.sortField = sortField;
    }

    public List<String> getSortDirection() {
        return sortDirection;
    }

    public void setSortDirection(List<String> sortDirection) {
        this.sortDirection = sortDirection;
    }
}
