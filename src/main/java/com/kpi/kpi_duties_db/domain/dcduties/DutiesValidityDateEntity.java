package com.kpi.kpi_duties_db.domain.dcduties;

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
    private Integer id;

    @Column(name = "isInKPI")
    private Boolean isInKpi;

    @Column(name = "Start")
    private Date start;

    @Column(name = "Stop")
    private Date stop;

    @Column(name = "isVirtual")
    private Boolean isVirtual;

    @Column(name = "RtDutiesId")
    private Integer rtDutiesId;

    public DutiesValidityDateEntity() {
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Boolean getInKpi() {
        return isInKpi;
    }

    public void setInKpi(Boolean inKpi) {
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

    public Integer getRtDutiesId() {
        return rtDutiesId;
    }

    public void setRtDutiesId(Integer rtDutiesId) {
        this.rtDutiesId = rtDutiesId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DutiesValidityDateEntity)) return false;
        DutiesValidityDateEntity that = (DutiesValidityDateEntity) o;
        return Objects.equals(getId(), that.getId()) &&
                Objects.equals(isInKpi, that.isInKpi) &&
                Objects.equals(getStart(), that.getStart()) &&
                Objects.equals(getStop(), that.getStop()) &&
                Objects.equals(isVirtual, that.isVirtual) &&
                Objects.equals(getRtDutiesId(), that.getRtDutiesId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), isInKpi, getStart(), getStop(), isVirtual, getRtDutiesId());
    }
}
