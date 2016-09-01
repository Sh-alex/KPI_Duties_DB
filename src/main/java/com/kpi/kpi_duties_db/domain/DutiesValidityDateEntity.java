package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Entity
@Table(name = "DutiesValidityDate", schema = "dbo", catalog = "DcDuties")
public class DutiesValidityDateEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;

    @Column(name= "RtDutiesId", insertable = false, updatable = false)
    private Integer rtDutiesId;

    @Column(name = "isInKPI")
    private boolean isInKpi;

    @Column(name = "Start")
    private Date start;

    @Column(name = "Stop")
    private Date stop;

    @Column(name = "isVirtual")
    private Boolean isVirtual;

    @ManyToOne
    @JoinColumn(name = "RtDutiesId")
    private RtDutiesEntity rtDutiesEntity;

    public DutiesValidityDateEntity() {
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getRtDutiesId() {
        return rtDutiesId;
    }

    public void setRtDutiesId(Integer rtDutiesId) {
        this.rtDutiesId = rtDutiesId;
    }

    public boolean isInKpi() {
        return isInKpi;
    }

    public void setInKpi(boolean inKpi) {
        isInKpi = inKpi;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getStop() {
        return stop;
    }

    public void setStop(Date stop) {
        this.stop = stop;
    }

    public Boolean getVirtual() {
        return isVirtual;
    }

    public void setVirtual(Boolean virtual) {
        isVirtual = virtual;
    }

    public RtDutiesEntity getRtDutiesEntity() {
        return rtDutiesEntity;
    }

    public void setRtDutiesEntity(RtDutiesEntity rtDutiesEntity) {
        this.rtDutiesEntity = rtDutiesEntity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DutiesValidityDateEntity)) return false;
        DutiesValidityDateEntity entity = (DutiesValidityDateEntity) o;
        return getId() == entity.getId() &&
                isInKpi() == entity.isInKpi() &&
                Objects.equals(getRtDutiesId(), entity.getRtDutiesId()) &&
                Objects.equals(getStart(), entity.getStart()) &&
                Objects.equals(getStop(), entity.getStop()) &&
                Objects.equals(isVirtual, entity.isVirtual) &&
                Objects.equals(getRtDutiesEntity(), entity.getRtDutiesEntity());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getRtDutiesId(), isInKpi(), getStart(), getStop(), isVirtual, getRtDutiesEntity());
    }
}
