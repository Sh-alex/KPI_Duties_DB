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
    private Integer parentId;

    @JsonProperty("clarification")
    private Integer dcDutiesNameId;

    @JsonProperty("occupationName")
    private String rtDutiesName;

    @JsonProperty("occupationNameMin")
    private String rtDutiesNameShort;

    @JsonProperty("documentName")
    private String documentName;

    @JsonProperty("documentUrl")
    private String documentUrl;

    @JsonProperty("documentTextsName")
    private String documentTextsName;

    @JsonProperty("documentTextsUrl")
    private String documentTextsUrl;

    public Integer getDcDutiesPartitionId() {
        return dcDutiesPartitionId;
    }

    public void setDcDutiesPartitionId(Integer dcDutiesPartitionId) {
        this.dcDutiesPartitionId = dcDutiesPartitionId;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
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

    public String getDocumentName() {
        return documentName;
    }

    public void setDocumentName(String documentName) {
        this.documentName = documentName;
    }

    public String getDocumentUrl() {
        return documentUrl;
    }

    public void setDocumentUrl(String documentUrl) {
        this.documentUrl = documentUrl;
    }

    public String getDocumentTextsName() {
        return documentTextsName;
    }

    public void setDocumentTextsName(String documentTextsName) {
        this.documentTextsName = documentTextsName;
    }

    public String getDocumentTextsUrl() {
        return documentTextsUrl;
    }

    public void setDocumentTextsUrl(String documentTextsUrl) {
        this.documentTextsUrl = documentTextsUrl;
    }
}
