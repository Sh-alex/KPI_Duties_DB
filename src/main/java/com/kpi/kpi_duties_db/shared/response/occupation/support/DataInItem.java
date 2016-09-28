package com.kpi.kpi_duties_db.shared.response.occupation.support;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Date;
import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 06.09.2016
 */

public class DataInItem {

    @JsonProperty("occupationName")
    private String rtDutiesName;

    @JsonProperty("occupationNameMin")
    private String rtDutiesNameShort;

    @JsonProperty("occupationGroup")
    private Integer dcDutiesPartitionId;

    @JsonProperty("clarifiedOccup")
    private Integer rtDutiesParentId;

    @JsonProperty("clarification")
    private Integer dcDutiesNameId;

    private Boolean isVirtual;

    private Boolean inKPI;

    private Date creatingInStateDate;

    private Date creatingInKPIDate;

    private Date cancelingInKPIDate;

    private Date cancelingInStateDate;

    private List<CodesInData> codes;

    private List<Requirement> haveToKnow;

    private List<Requirement> responsibilities;

    private List<Requirement> qualiffRequir;

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

    public String getRtDutiesNameShort() {
        return rtDutiesNameShort;
    }

    public void setRtDutiesNameShort(String rtDutiesNameShort) {
        this.rtDutiesNameShort = rtDutiesNameShort;
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

    public Boolean getVirtual() {
        return isVirtual;
    }

    public void setVirtual(Boolean virtual) {
        isVirtual = virtual;
    }

    public Boolean getInKPI() {
        return inKPI;
    }

    public void setInKPI(Boolean inKPI) {
        this.inKPI = inKPI;
    }

    public Date getCreatingInStateDate() {
        return creatingInStateDate;
    }

    public void setCreatingInStateDate(Date creatingInStateDate) {
        this.creatingInStateDate = creatingInStateDate;
    }

    public Date getCreatingInKPIDate() {
        return creatingInKPIDate;
    }

    public void setCreatingInKPIDate(Date creatingInKPIDate) {
        this.creatingInKPIDate = creatingInKPIDate;
    }

    public Date getCancelingInKPIDate() {
        return cancelingInKPIDate;
    }

    public void setCancelingInKPIDate(Date cancelingInKPIDate) {
        this.cancelingInKPIDate = cancelingInKPIDate;
    }

    public Date getCancelingInStateDate() {
        return cancelingInStateDate;
    }

    public void setCancelingInStateDate(Date cancelingInStateDate) {
        this.cancelingInStateDate = cancelingInStateDate;
    }

    public List<CodesInData> getCodes() {
        return codes;
    }

    public void setCodes(List<CodesInData> codes) {
        this.codes = codes;
    }

    public List<Requirement> getHaveToKnow() {
        return haveToKnow;
    }

    public void setHaveToKnow(List<Requirement> haveToKnow) {
        this.haveToKnow = haveToKnow;
    }

    public List<Requirement> getResponsibilities() {
        return responsibilities;
    }

    public void setResponsibilities(List<Requirement> responsibilities) {
        this.responsibilities = responsibilities;
    }

    public List<Requirement> getQualiffRequir() {
        return qualiffRequir;
    }

    public void setQualiffRequir(List<Requirement> qualiffRequir) {
        this.qualiffRequir = qualiffRequir;
    }
}
