package com.kpi.kpi_duties_db.service.parser.support;

import java.sql.Date;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 04.12.2016
 */

public class OccupationFromXls {

    private String duties;

    private String clarification1;
    private String clarification2;
    private String clarification3;
    private String clarification4;

    private String clarificationCat;

    private String name;

    private String shortName;

    private String partition;

    private String codeKP;
    private String codeZkpptr;
    private String codeEtkd;
    private String codeDkhp;

    private Date date;

    private Boolean isKpi;

    public String getDuties() {
        return duties;
    }

    public void setDuties(String duties) {
        this.duties = duties;
    }

    public String getClarification1() {
        return clarification1;
    }

    public void setClarification1(String clarification1) {
        this.clarification1 = clarification1;
    }

    public String getClarification2() {
        return clarification2;
    }

    public void setClarification2(String clarification2) {
        this.clarification2 = clarification2;
    }

    public String getClarification3() {
        return clarification3;
    }

    public void setClarification3(String clarification3) {
        this.clarification3 = clarification3;
    }

    public String getClarification4() {
        return clarification4;
    }

    public void setClarification4(String clarification4) {
        this.clarification4 = clarification4;
    }

    public String getClarificationCat() {
        return clarificationCat;
    }

    public void setClarificationCat(String clarificationCat) {
        this.clarificationCat = clarificationCat;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getPartition() {
        return partition;
    }

    public void setPartition(String partition) {
        this.partition = partition;
    }

    public String getCodeKP() {
        return codeKP;
    }

    public void setCodeKP(String codeKP) {
        this.codeKP = codeKP;
    }

    public String getCodeZkpptr() {
        return codeZkpptr;
    }

    public void setCodeZkpptr(String codeZkpptr) {
        this.codeZkpptr = codeZkpptr;
    }

    public String getCodeEtkd() {
        return codeEtkd;
    }

    public void setCodeEtkd(String codeEtkd) {
        this.codeEtkd = codeEtkd;
    }

    public String getCodeDkhp() {
        return codeDkhp;
    }

    public void setCodeDkhp(String codeDkhp) {
        this.codeDkhp = codeDkhp;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Boolean getKpi() {
        return isKpi;
    }

    public void setKpi(Boolean kpi) {
        isKpi = kpi;
    }
}
