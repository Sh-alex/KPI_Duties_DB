package com.kpi.kpi_duties_db.shared.response.occupation.support;

import java.sql.Date;
import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 06.09.2016
 */

public class DataInItem {

    private Date cancelingInKPIDate;

    private Date cancelingInStateDate;

    private Date creatingInKPIDate;

    private Date creatingInStateDate;

    private Boolean isVirtual;

    private Boolean inKPI;

    private String occupationGroup;

    private String occupationName;

    private String occupationNameMin;

    private List<CodesInData> codes;

    private List<Requirement> haveToKnow;

    private List<Requirement> responsibilities;

    private List<Requirement> qualiffRequir;

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

    public Date getCreatingInKPIDate() {
        return creatingInKPIDate;
    }

    public void setCreatingInKPIDate(Date creatingInKPIDate) {
        this.creatingInKPIDate = creatingInKPIDate;
    }

    public Date getCreatingInStateDate() {
        return creatingInStateDate;
    }

    public void setCreatingInStateDate(Date creatingInStateDate) {
        this.creatingInStateDate = creatingInStateDate;
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

    public String getOccupationGroup() {
        return occupationGroup;
    }

    public void setOccupationGroup(String occupationGroup) {
        this.occupationGroup = occupationGroup;
    }

    public String getOccupationName() {
        return occupationName;
    }

    public void setOccupationName(String occupationName) {
        this.occupationName = occupationName;
    }

    public String getOccupationNameMin() {
        return occupationNameMin;
    }

    public void setOccupationNameMin(String occupationNameMin) {
        this.occupationNameMin = occupationNameMin;
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
