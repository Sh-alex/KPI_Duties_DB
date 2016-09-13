package com.kpi.kpi_duties_db.shared.request.occupation.support;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Date;
/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 01.09.2016
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class CodeOccupation {

    @JsonProperty("codeKP")
    private Integer codeKPId;

    @JsonProperty("codeZKPPTR")
    private Integer codeZKPPTRId;

    @JsonProperty("codeETDK")
    private Integer codeETDKId;

    @JsonProperty("codeDKHP")
    private Integer codeDKHPId;

    private Date portionStartDate;

    private Date portionEndDate;

    public Integer getCodeKPId() {
        return codeKPId;
    }

    public void setCodeKPId(Integer codeKPId) {
        this.codeKPId = codeKPId;
    }

    public Integer getCodeZKPPTRId() {
        return codeZKPPTRId;
    }

    public void setCodeZKPPTRId(Integer codeZKPPTRId) {
        this.codeZKPPTRId = codeZKPPTRId;
    }

    public Integer getCodeETDKId() {
        return codeETDKId;
    }

    public void setCodeETDKId(Integer codeETDKId) {
        this.codeETDKId = codeETDKId;
    }

    public Integer getCodeDKHPId() {
        return codeDKHPId;
    }

    public void setCodeDKHPId(Integer codeDKHPId) {
        this.codeDKHPId = codeDKHPId;
    }

    public Date getPortionStartDate() {
        return portionStartDate;
    }

    public void setPortionStartDate(Date portionStartDate) {
        this.portionStartDate = portionStartDate;
    }

    public Date getPortionEndDate() {
        return portionEndDate;
    }

    public void setPortionEndDate(Date portionEndDate) {
        this.portionEndDate = portionEndDate;
    }
}
