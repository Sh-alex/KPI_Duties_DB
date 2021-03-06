package com.kpi.kpi_duties_db.shared.response.occupation.support;

import com.fasterxml.jackson.annotation.JsonProperty;

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

    @JsonProperty("occupationGroupName")
    private String dcDutiesPartitionName;

    @JsonProperty("clarifiedOccup")
    private Integer rtDutiesParentId;

    @JsonProperty("clarifiedOccupName")
    private String rtDutiesParentName;

    @JsonProperty("clarification")
    private Integer dcDutiesNameId;

    @JsonProperty("clarificationName")
    private String dcDutiesName;

    private String mainInfoDocRefName;

    private String mainInfoDocRefLink;

    private String descriptionDocRefName;

    private String descriptionDocRefLink;

    private List<Duration> durations;

    private List<CodesInData> codes;

    private List<Requirement> haveToKnow;

    private List<Requirement> responsibilities;

    private List<Requirement> qualiffRequir;

    private List<String> occupNameStructure;

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

    public Integer getDcDutiesPartitionId() {
        return dcDutiesPartitionId;
    }

    public void setDcDutiesPartitionId(Integer dcDutiesPartitionId) {
        this.dcDutiesPartitionId = dcDutiesPartitionId;
    }

    public String getDcDutiesPartitionName() {
        return dcDutiesPartitionName;
    }

    public void setDcDutiesPartitionName(String dcDutiesPartitionName) {
        this.dcDutiesPartitionName = dcDutiesPartitionName;
    }

    public Integer getRtDutiesParentId() {
        return rtDutiesParentId;
    }

    public void setRtDutiesParentId(Integer rtDutiesParentId) {
        this.rtDutiesParentId = rtDutiesParentId;
    }

    public String getRtDutiesParentName() {
        return rtDutiesParentName;
    }

    public void setRtDutiesParentName(String rtDutiesParentName) {
        this.rtDutiesParentName = rtDutiesParentName;
    }

    public Integer getDcDutiesNameId() {
        return dcDutiesNameId;
    }

    public void setDcDutiesNameId(Integer dcDutiesNameId) {
        this.dcDutiesNameId = dcDutiesNameId;
    }

    public String getDcDutiesName() {
        return dcDutiesName;
    }

    public void setDcDutiesName(String dcDutiesName) {
        this.dcDutiesName = dcDutiesName;
    }

    public String getMainInfoDocRefName() {
        return mainInfoDocRefName;
    }

    public void setMainInfoDocRefName(String mainInfoDocRefName) {
        this.mainInfoDocRefName = mainInfoDocRefName;
    }

    public String getMainInfoDocRefLink() {
        return mainInfoDocRefLink;
    }

    public void setMainInfoDocRefLink(String mainInfoDocRefLink) {
        this.mainInfoDocRefLink = mainInfoDocRefLink;
    }

    public String getDescriptionDocRefName() {
        return descriptionDocRefName;
    }

    public void setDescriptionDocRefName(String descriptionDocRefName) {
        this.descriptionDocRefName = descriptionDocRefName;
    }

    public String getDescriptionDocRefLink() {
        return descriptionDocRefLink;
    }

    public void setDescriptionDocRefLink(String descriptionDocRefLink) {
        this.descriptionDocRefLink = descriptionDocRefLink;
    }

    public List<Duration> getDurations() {
        return durations;
    }

    public void setDurations(List<Duration> durations) {
        this.durations = durations;
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

    public List<String> getOccupNameStructure() {
        return occupNameStructure;
    }

    public void setOccupNameStructure(List<String> occupNameStructure) {
        this.occupNameStructure = occupNameStructure;
    }
}
