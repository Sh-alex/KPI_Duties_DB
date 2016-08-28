package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.sql.Date;
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

    @Basic
    @Column(name = "NewId")
    private Integer newId;

    @Basic
    @Column(name = "DateStart")
    private Date dateStart;

    @Basic
    @Column(name = "DateStop")
    private Date dateStop;

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

    public Set<RtDutiesCodeEntity> getRtDutiesCodeEntities() {
        return this.rtDutiesCodeEntities;
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
        if (o == null || getClass() != o.getClass()) return false;

        RtCodeEntity that = (RtCodeEntity) o;

        if (id != that.id) return false;
        if (newId != null ? !newId.equals(that.newId) : that.newId != null) return false;
        if (dateStart != null ? !dateStart.equals(that.dateStart) : that.dateStart != null) return false;
        if (dateStop != null ? !dateStop.equals(that.dateStop) : that.dateStop != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (newId != null ? newId.hashCode() : 0);
        result = 31 * result + (dateStart != null ? dateStart.hashCode() : 0);
        result = 31 * result + (dateStop != null ? dateStop.hashCode() : 0);
        return result;
    }
}
