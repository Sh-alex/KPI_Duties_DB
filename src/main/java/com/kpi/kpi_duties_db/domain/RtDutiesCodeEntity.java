package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.sql.Date;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Entity
@Table(name = "RtDutiesCode", schema = "dbo", catalog = "DcDuties")
public class RtDutiesCodeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;

    @Column(name = "RtDutiesCodeId")
    private int rtDutiesCodeId;

    @Column(name = "DateStart")
    private Date dateStart;

    @Column(name = "DateStop")
    private Date dateStop;

    @Column(name = "GUID")
    private String guid;

    @ManyToOne
    @JoinColumn(name = "RtCodeId")
    private RtCodeEntity rtCodeEntity;

    @ManyToOne
    @JoinColumn(name = "RtDutiesId")
    private RtDutiesEntity rtDutiesEntity;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRtDutiesCodeId() {
        return rtDutiesCodeId;
    }

    public void setRtDutiesCodeId(int rtDutiesCodeId) {
        this.rtDutiesCodeId = rtDutiesCodeId;
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

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    public RtCodeEntity getRtCodeEntity() {
        return this.rtCodeEntity;
    }

    public void setRtCodeEntity(RtCodeEntity rtCodeEntity) {
        this.rtCodeEntity = rtCodeEntity;
    }

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
