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

    @Column(name = "CodeDKHPId", insertable = false, updatable = false)
    private Integer codeDKHPId;

    @Column(name = "CodeETKDId", insertable = false, updatable = false)
    private Integer codeETKDId;

    @Column(name = "CodeKPId", insertable = false, updatable = false)
    private Integer codeKPId;

    @Column(name = "CodeZKPPTRId", insertable = false, updatable = false)
    private Integer codeZKPPTRId;

    @OneToMany(mappedBy = "rtCodeEntity")
    private Set<RtDutiesCodeEntity> rtDutiesCodeEntities;

    @ManyToOne
    @JoinColumn(name = "CodeZKPPTRId")
    private DcCodeZkpptrEntity dcCodeZkpptrEntity;

    @ManyToOne
    @JoinColumn(name = "CodeDKHPId")
    private DcCodeDkhpEntity dcCodeDkhpEntity;

    @ManyToOne
    @JoinColumn(name = "CodeETKDId")
    private DcCodeEtkdEntity dcCodeEtkdEntity;

    @ManyToOne
    @JoinColumn(name = "CodeKPId")
    private DcCodeKpEntity dcCodeKpEntity;


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

    public DcCodeZkpptrEntity getDcCodeZkpptrEntity() {
        return dcCodeZkpptrEntity;
    }

    public void setDcCodeZkpptrEntity(DcCodeZkpptrEntity dcCodeZkpptrEntity) {
        this.dcCodeZkpptrEntity = dcCodeZkpptrEntity;
    }

    public DcCodeDkhpEntity getDcCodeDkhpEntity() {
        return dcCodeDkhpEntity;
    }

    public void setDcCodeDkhpEntity(DcCodeDkhpEntity dcCodeDkhpEntity) {
        this.dcCodeDkhpEntity = dcCodeDkhpEntity;
    }

    public DcCodeEtkdEntity getDcCodeEtkdEntity() {
        return dcCodeEtkdEntity;
    }

    public void setDcCodeEtkdEntity(DcCodeEtkdEntity dcCodeEtkdEntity) {
        this.dcCodeEtkdEntity = dcCodeEtkdEntity;
    }

    public DcCodeKpEntity getDcCodeKpEntity() {
        return dcCodeKpEntity;
    }

    public void setDcCodeKpEntity(DcCodeKpEntity dcCodeKpEntity) {
        this.dcCodeKpEntity = dcCodeKpEntity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RtCodeEntity)) return false;
        RtCodeEntity entity = (RtCodeEntity) o;
        return getId() == entity.getId() &&
                Objects.equals(getNewId(), entity.getNewId()) &&
                Objects.equals(getDateStart(), entity.getDateStart()) &&
                Objects.equals(getDateStop(), entity.getDateStop()) &&
                Objects.equals(getCodeDKHPId(), entity.getCodeDKHPId()) &&
                Objects.equals(getCodeETKDId(), entity.getCodeETKDId()) &&
                Objects.equals(getCodeKPId(), entity.getCodeKPId()) &&
                Objects.equals(getCodeZKPPTRId(), entity.getCodeZKPPTRId()) &&
                Objects.equals(getRtDutiesCodeEntities(), entity.getRtDutiesCodeEntities()) &&
                Objects.equals(getDcCodeZkpptrEntity(), entity.getDcCodeZkpptrEntity()) &&
                Objects.equals(getDcCodeDkhpEntity(), entity.getDcCodeDkhpEntity()) &&
                Objects.equals(getDcCodeEtkdEntity(), entity.getDcCodeEtkdEntity()) &&
                Objects.equals(getDcCodeKpEntity(), entity.getDcCodeKpEntity());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getNewId(), getDateStart(), getDateStop(), getCodeDKHPId(), getCodeETKDId(), getCodeKPId(), getCodeZKPPTRId(), getRtDutiesCodeEntities(), getDcCodeZkpptrEntity(), getDcCodeDkhpEntity(), getDcCodeEtkdEntity(), getDcCodeKpEntity());
    }
}
