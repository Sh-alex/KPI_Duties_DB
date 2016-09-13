package com.kpi.kpi_duties_db.shared.dto.occupation;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

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

    private String searchType;

    private Integer dcDutiesPartitionId;

    private String rtDutiesName;

    private List<String> dcDutiesNames;

    private Date creatingInStateDate_from;

    private Date creatingInStateDate_to;

    private Date cancelingInStateDate_from;

    private Date cancelingInStateDate_to;

    private Date creatingInKPIDate_from;

    private Date creatingInKPIDate_to;

    private Date cancelingInKPIDate_from;

    private Date cancelingInKPIDate_to;

    public String getSearchType() {
        return searchType;
    }

    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }

    public Integer getDcDutiesPartitionId() {
        return dcDutiesPartitionId;
    }

    public void setDcDutiesPartitionId(Integer dcDutiesPartitionId) {
        this.dcDutiesPartitionId = dcDutiesPartitionId;
    }

    public String getRtDutiesName() {
        return rtDutiesName;
    }

    public void setRtDutiesName(String rtDutiesName) {
        this.rtDutiesName = rtDutiesName;
    }

    public List<String> getDcDutiesNames() {
        return dcDutiesNames;
    }

    public void setDcDutiesNames(List<String> dcDutiesNames) {
        this.dcDutiesNames = dcDutiesNames;
    }

    public Date getCreatingInStateDate_from() {
        return creatingInStateDate_from;
    }

    public void setCreatingInStateDate_from(Date creatingInStateDate_from) {
        this.creatingInStateDate_from = creatingInStateDate_from;
    }

    public Date getCreatingInStateDate_to() {
        return creatingInStateDate_to;
    }

    public void setCreatingInStateDate_to(Date creatingInStateDate_to) {
        this.creatingInStateDate_to = creatingInStateDate_to;
    }

    public Date getCancelingInStateDate_from() {
        return cancelingInStateDate_from;
    }

    public void setCancelingInStateDate_from(Date cancelingInStateDate_from) {
        this.cancelingInStateDate_from = cancelingInStateDate_from;
    }

    public Date getCancelingInStateDate_to() {
        return cancelingInStateDate_to;
    }

    public void setCancelingInStateDate_to(Date cancelingInStateDate_to) {
        this.cancelingInStateDate_to = cancelingInStateDate_to;
    }

    public Date getCreatingInKPIDate_from() {
        return creatingInKPIDate_from;
    }

    public void setCreatingInKPIDate_from(Date creatingInKPIDate_from) {
        this.creatingInKPIDate_from = creatingInKPIDate_from;
    }

    public Date getCreatingInKPIDate_to() {
        return creatingInKPIDate_to;
    }

    public void setCreatingInKPIDate_to(Date creatingInKPIDate_to) {
        this.creatingInKPIDate_to = creatingInKPIDate_to;
    }

    public Date getCancelingInKPIDate_from() {
        return cancelingInKPIDate_from;
    }

    public void setCancelingInKPIDate_from(Date cancelingInKPIDate_from) {
        this.cancelingInKPIDate_from = cancelingInKPIDate_from;
    }

    public Date getCancelingInKPIDate_to() {
        return cancelingInKPIDate_to;
    }

    public void setCancelingInKPIDate_to(Date cancelingInKPIDate_to) {
        this.cancelingInKPIDate_to = cancelingInKPIDate_to;
    }
}
