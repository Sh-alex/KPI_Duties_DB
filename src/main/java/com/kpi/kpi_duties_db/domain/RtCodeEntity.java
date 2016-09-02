package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;
import java.util.Set;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Entity
@Table(name = "RtCode", schema = "dbo", catalog = "DcDuties")
public class RtCodeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;

    @Column(name = "NewId")
    private Integer newId;

    @Column(name = "DateStart")
    private Date dateStart;

    @Column(name = "DateStop")
    private Date dateStop;

    @Column(name = "CodeDKHPId")
    private Integer codeDKHPId;

    @Column(name = "CodeETKDId")
    private Integer codeETKDId;

    @Column(name = "CodeKPId")
    private Integer codeKPId;

    @Column(name = "CodeZKPPTRId")
    private Integer codeZKPPTRId;

    @OneToMany(mappedBy = "rtCodeEntity", cascade = CascadeType.ALL)
    private Set<RtDutiesCodeEntity> rtDutiesCodeEntities;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getNewId() {
        return newId;
    }

    public void setNewId(Integer newId) {
        this.newId = newId;
    }

    public Date getDateStart() {
        return dateStart;
    }

    public void setDateStart(Date dateStart) {
        this.dateStart = dateStart;
    }

    public Date getDateStop() {
        return dateStop;
    }

    public void setDateStop(Date dateStop) {
        this.dateStop = dateStop;
    }

    public Integer getCodeDKHPId() {
        return codeDKHPId;
    }

    public void setCodeDKHPId(Integer codeDKHPId) {
        this.codeDKHPId = codeDKHPId;
    }

    public Integer getCodeETKDId() {
        return codeETKDId;
    }

    public void setCodeETKDId(Integer codeETKDId) {
        this.codeETKDId = codeETKDId;
    }

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

    public Set<RtDutiesCodeEntity> getRtDutiesCodeEntities() {
        return rtDutiesCodeEntities;
    }

    public void setRtDutiesCodeEntities(Set<RtDutiesCodeEntity> rtDutiesCodeEntities) {
        this.rtDutiesCodeEntities = rtDutiesCodeEntities;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RtCodeEntity)) return false;
        RtCodeEntity that = (RtCodeEntity) o;
        return getId() == that.getId() &&
                Objects.equals(getNewId(), that.getNewId()) &&
                Objects.equals(getDateStart(), that.getDateStart()) &&
                Objects.equals(getDateStop(), that.getDateStop()) &&
                Objects.equals(getCodeDKHPId(), that.getCodeDKHPId()) &&
                Objects.equals(getCodeETKDId(), that.getCodeETKDId()) &&
                Objects.equals(getCodeKPId(), that.getCodeKPId()) &&
                Objects.equals(getCodeZKPPTRId(), that.getCodeZKPPTRId()) &&
                Objects.equals(getRtDutiesCodeEntities(), that.getRtDutiesCodeEntities());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getNewId(), getDateStart(), getDateStop(), getCodeDKHPId(), getCodeETKDId(), getCodeKPId(), getCodeZKPPTRId(), getRtDutiesCodeEntities());
    }
}
