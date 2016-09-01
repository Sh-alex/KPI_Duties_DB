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

    @Column(name= "RtDutiesId")
    private Integer rtDutiesId;

    @Column(name = "isInKPI")
    private boolean isInKpi;

    @Column(name = "Start")
    private Date start;

    @Column(name = "Stop")
    private Date stop;

    @Column(name = "isVirtual")
    private Boolean isVirtual;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DutiesValidityDateEntity)) return false;
        DutiesValidityDateEntity that = (DutiesValidityDateEntity) o;
        return getId() == that.getId() &&
                isInKpi() == that.isInKpi() &&
                Objects.equals(getRtDutiesId(), that.getRtDutiesId()) &&
                Objects.equals(getStart(), that.getStart()) &&
                Objects.equals(getStop(), that.getStop()) &&
                Objects.equals(isVirtual, that.isVirtual);
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getRtDutiesId(), isInKpi(), getStart(), getStop(), isVirtual);
    }
}
