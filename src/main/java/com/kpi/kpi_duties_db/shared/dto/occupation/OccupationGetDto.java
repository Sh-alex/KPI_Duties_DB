package com.kpi.kpi_duties_db.shared.dto.occupation;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 04.09.2016
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OccupationGetDto {

    private List<Integer> idList;

    @NotNull
    private String searchType;

    private List<Integer> dcDutiesPartitionIdList;

    private String rtDutiesName;

    private List<String> rtDutiesNameTags;

    private Date startFrom;

    private Date startTo;

    private Date stopFrom;

    private Date stopTo;

    private String inKpi;

    private Integer limit;

    private Integer offset;

    public List<Integer> getIdList() {
        return idList;
    }

    public void setIdList(List<Integer> idList) {
        this.idList = idList;
    }

    public String getSearchType() {
        return searchType;
    }

    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }

    public List<Integer> getDcDutiesPartitionIdList() {
        return dcDutiesPartitionIdList;
    }

    public void setDcDutiesPartitionIdList(List<Integer> dcDutiesPartitionIdList) {
        this.dcDutiesPartitionIdList = dcDutiesPartitionIdList;
    }

    public String getRtDutiesName() {
        return rtDutiesName;
    }

    public void setRtDutiesName(String rtDutiesName) {
        this.rtDutiesName = rtDutiesName;
    }

    public List<String> getRtDutiesNameTags() {
        return rtDutiesNameTags;
    }

    public void setRtDutiesNameTags(List<String> rtDutiesNameTags) {
        this.rtDutiesNameTags = rtDutiesNameTags;
    }

    public Date getStartFrom() {
        return startFrom;
    }

    public void setStartFrom(Date startFrom) {
        this.startFrom = startFrom;
    }

    public Date getStartTo() {
        return startTo;
    }

    public void setStartTo(Date startTo) {
        this.startTo = startTo;
    }

    public Date getStopFrom() {
        return stopFrom;
    }

    public void setStopFrom(Date stopFrom) {
        this.stopFrom = stopFrom;
    }

    public Date getStopTo() {
        return stopTo;
    }

    public void setStopTo(Date stopTo) {
        this.stopTo = stopTo;
    }

    public String getInKpi() {
        return inKpi;
    }

    public void setInKpi(String inKpi) {
        this.inKpi = inKpi;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public Integer getOffset() {
        return offset;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }
}
