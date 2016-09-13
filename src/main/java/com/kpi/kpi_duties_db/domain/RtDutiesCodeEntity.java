package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

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
    private Integer id;

    @Column(name = "RtDutiesCodeId")
    private Integer rtDutiesCodeId;

    @Column(name = "DateStart")
    private Date dateStart;

    @Column(name = "DateStop")
    private Date dateStop;

    @Column(name = "GUID")
    private String guid;

    @Column(name = "RtDutiesId")
    private Integer rtDutiesId;

    @Column(name = "RtCodeId")
    private Integer rtCodeId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "RtCodeId", insertable = false, updatable = false)
    private RtCodeEntity rtCodeEntity;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRtDutiesCodeId() {
        return rtDutiesCodeId;
    }

    public void setRtDutiesCodeId(Integer rtDutiesCodeId) {
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

    public Integer getRtDutiesId() {
        return rtDutiesId;
    }

    public void setRtDutiesId(Integer rtDutiesId) {
        this.rtDutiesId = rtDutiesId;
    }

    public Integer getRtCodeId() {
        return rtCodeId;
    }

    public void setRtCodeId(Integer rtCodeId) {
        this.rtCodeId = rtCodeId;
    }

    public RtCodeEntity getRtCodeEntity() {
        return rtCodeEntity;
    }

    public void setRtCodeEntity(RtCodeEntity rtCodeEntity) {
        this.rtCodeEntity = rtCodeEntity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RtDutiesCodeEntity)) return false;
        RtDutiesCodeEntity entity = (RtDutiesCodeEntity) o;
        return Objects.equals(getId(), entity.getId()) &&
                Objects.equals(getRtDutiesCodeId(), entity.getRtDutiesCodeId()) &&
                Objects.equals(getDateStart(), entity.getDateStart()) &&
                Objects.equals(getDateStop(), entity.getDateStop()) &&
                Objects.equals(getGuid(), entity.getGuid()) &&
                Objects.equals(getRtDutiesId(), entity.getRtDutiesId()) &&
                Objects.equals(getRtCodeId(), entity.getRtCodeId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getRtDutiesCodeId(), getDateStart(), getDateStop(), getGuid(), getRtDutiesId(), getRtCodeId());
    }
}
