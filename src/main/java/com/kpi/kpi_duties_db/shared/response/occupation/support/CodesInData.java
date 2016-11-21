package com.kpi.kpi_duties_db.shared.response.occupation.support;

import java.sql.Date;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 06.09.2016
 */

public class CodesInData {

    private Integer id;

    private Code codeDKHP;

    private Code codeETDK;

    private Code codeKP;

    private Code codeZKPPTR;

    private Date portionStartDate;

    private Date portionEndDate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Code getCodeDKHP() {
        return codeDKHP;
    }

    public void setCodeDKHP(Code codeDKHP) {
        this.codeDKHP = codeDKHP;
    }

    public Code getCodeETDK() {
        return codeETDK;
    }

    public void setCodeETDK(Code codeETDK) {
        this.codeETDK = codeETDK;
    }

    public Code getCodeKP() {
        return codeKP;
    }

    public void setCodeKP(Code codeKP) {
        this.codeKP = codeKP;
    }

    public Code getCodeZKPPTR() {
        return codeZKPPTR;
    }

    public void setCodeZKPPTR(Code codeZKPPTR) {
        this.codeZKPPTR = codeZKPPTR;
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
