package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "RtCode", schema = "dbo", catalog = "DcDuties")
public class RtCodeEntity {
    private int id;
    private Integer newId;
    private Date dateStart;
    private Date dateStop;

    private Set<RtDutiesCodeEntity> rtDutiesCodeEntities = new HashSet<>();

    private DcCodeZkpptrEntity dcCodeZkpptrEntity;
    private DcCodeDkhpEntity dcCodeDkhpEntity;
    private DcCodeEtkdEntity dcCodeEtkdEntity;
    private DcCodeKpEntity dcCodeKpEntity;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "Id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "NewId")
    public Integer getNewId() {
        return newId;
    }

    public void setNewId(Integer newId) {
        this.newId = newId;
    }

    @Basic
    @Column(name = "DateStart")
    public Date getDateStart() {
        return dateStart;
    }

    public void setDateStart(Date dateStart) {
        this.dateStart = dateStart;
    }

    @Basic
    @Column(name = "DateStop")
    public Date getDateStop() {
        return dateStop;
    }

    public void setDateStop(Date dateStop) {
        this.dateStop = dateStop;
    }



    @OneToMany(mappedBy = "rtCodeEntity", fetch = FetchType.LAZY)
    public Set<RtDutiesCodeEntity> getRtDutiesCodeEntities() {
        return this.rtDutiesCodeEntities;
    }

    public void setRtDutiesCodeEntities(Set<RtDutiesCodeEntity> rtDutiesCodeEntities) {
        this.rtDutiesCodeEntities = rtDutiesCodeEntities;
    }

    @ManyToOne
    @JoinColumn(name = "CodeZKPPTRId")
    public DcCodeZkpptrEntity getDcCodeZkpptrEntity() {
        return dcCodeZkpptrEntity;
    }

    public void setDcCodeZkpptrEntity(DcCodeZkpptrEntity dcCodeZkpptrEntity) {
        this.dcCodeZkpptrEntity = dcCodeZkpptrEntity;
    }
    @ManyToOne
    @JoinColumn(name = "CodeDKHPId")
    public DcCodeDkhpEntity getDcCodeDkhpEntity() {
        return dcCodeDkhpEntity;
    }

    public void setDcCodeDkhpEntity(DcCodeDkhpEntity dcCodeDkhpEntity) {
        this.dcCodeDkhpEntity = dcCodeDkhpEntity;
    }

    @ManyToOne
    @JoinColumn(name = "CodeETKDId")
    public DcCodeEtkdEntity getDcCodeEtkdEntity() {
        return dcCodeEtkdEntity;
    }

    public void setDcCodeEtkdEntity(DcCodeEtkdEntity dcCodeEtkdEntity) {
        this.dcCodeEtkdEntity = dcCodeEtkdEntity;
    }

    @ManyToOne
    @JoinColumn(name = "CodeKPId")
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
