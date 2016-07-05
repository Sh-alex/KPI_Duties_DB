package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "RtDutiesCode", schema = "dbo", catalog = "DcDuties")
public class RtDutiesCodeEntity {
    private int id;
    private int rtDutiesCodeId;
    private Date dateStart;
    private Date dateStop;
    private String guid;

    private RtCodeEntity rtCodeEntity;
    private RtDutiesEntity rtDutiesEntity;

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
    @Column(name = "RtDutiesCodeId")
    public int getRtDutiesCodeId() {
        return rtDutiesCodeId;
    }

    public void setRtDutiesCodeId(int rtDutiesCodeId) {
        this.rtDutiesCodeId = rtDutiesCodeId;
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

    @Basic
    @Column(name = "GUID")
    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }


    @ManyToOne
    @JoinColumn(name = "RtCodeId")
    public RtCodeEntity getRtCodeEntity() {
        return this.rtCodeEntity;
    }

    public void setRtCodeEntity(RtCodeEntity rtCodeEntity) {
        this.rtCodeEntity = rtCodeEntity;
    }

    @ManyToOne
    @JoinColumn(name = "RtDutiesId")
    public RtDutiesEntity getRtDutiesEntity() {
        return this.rtDutiesEntity;
    }

    public void setRtDutiesEntity(RtDutiesEntity rtDutiesEntity) {
        this.rtDutiesEntity = rtDutiesEntity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        RtDutiesCodeEntity that = (RtDutiesCodeEntity) o;

        if (id != that.id) return false;
        if (rtDutiesCodeId != that.rtDutiesCodeId) return false;
        if (dateStart != null ? !dateStart.equals(that.dateStart) : that.dateStart != null) return false;
        if (dateStop != null ? !dateStop.equals(that.dateStop) : that.dateStop != null) return false;
        if (guid != null ? !guid.equals(that.guid) : that.guid != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + rtDutiesCodeId;
        result = 31 * result + (dateStart != null ? dateStart.hashCode() : 0);
        result = 31 * result + (dateStop != null ? dateStop.hashCode() : 0);
        result = 31 * result + (guid != null ? guid.hashCode() : 0);
        return result;
    }
}
