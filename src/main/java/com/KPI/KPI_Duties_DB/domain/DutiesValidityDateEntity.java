package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "DutiesValidityDate", schema = "dbo", catalog = "DcDuties")
public class DutiesValidityDateEntity {
    private int id;
    private boolean isInKpi;
    private Date start;
    private Date stop;
    private Boolean isVirtual;

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
    @Column(name = "isInKPI")
    public boolean isInKpi() {
        return isInKpi;
    }

    public void setInKpi(boolean inKpi) {
        isInKpi = inKpi;
    }

    @Basic
    @Column(name = "Start")
    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    @Basic
    @Column(name = "Stop")
    public Date getStop() {
        return stop;
    }

    public void setStop(Date stop) {
        this.stop = stop;
    }

    @Basic
    @Column(name = "isVirtual")
    public Boolean getVirtual() {
        return isVirtual;
    }

    public void setVirtual(Boolean virtual) {
        isVirtual = virtual;
    }

    @ManyToOne
    @JoinColumn(name = "RtDutiesId")
    public RtDutiesEntity getRtDutiesEntity() {
        return rtDutiesEntity;
    }

    public void setRtDutiesEntity(RtDutiesEntity rtDutiesEntity) {
        this.rtDutiesEntity = rtDutiesEntity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DutiesValidityDateEntity that = (DutiesValidityDateEntity) o;

        if (id != that.id) return false;
        if (isInKpi != that.isInKpi) return false;
        if (start != null ? !start.equals(that.start) : that.start != null) return false;
        if (stop != null ? !stop.equals(that.stop) : that.stop != null) return false;
        if (isVirtual != null ? !isVirtual.equals(that.isVirtual) : that.isVirtual != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (isInKpi ? 1 : 0);
        result = 31 * result + (start != null ? start.hashCode() : 0);
        result = 31 * result + (stop != null ? stop.hashCode() : 0);
        result = 31 * result + (isVirtual != null ? isVirtual.hashCode() : 0);
        return result;
    }
}
