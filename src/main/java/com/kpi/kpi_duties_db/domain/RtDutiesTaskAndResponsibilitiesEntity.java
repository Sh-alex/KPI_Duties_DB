package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Entity
@Table(name = "RtDuties_TaskAndResponsibilities", schema = "dbo", catalog = "DcDuties")
public class RtDutiesTaskAndResponsibilitiesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @Column(name = "DcDuties_TasksAndResponsibilitiesId")
    private Integer dcDutiesTasksAndResponsibilitiesId;

    @Column(name = "DateStart")
    private Date dateStart;

    @Column(name = "DateEnd")
    private Date dateEnd;

    @Column(name = "RtDutiesId")
    private Integer rtDutiesId;

    @ManyToOne
    @JoinColumn(name = "DcDuties_TasksAndResponsibilitiesId", insertable = false, updatable = false)
    private DcDutiesTasksAndResponsibilitiesEntity dcDutiesTasksAndResponsibilitiesEntity;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getDcDutiesTasksAndResponsibilitiesId() {
        return dcDutiesTasksAndResponsibilitiesId;
    }

    public void setDcDutiesTasksAndResponsibilitiesId(Integer dcDutiesTasksAndResponsibilitiesId) {
        this.dcDutiesTasksAndResponsibilitiesId = dcDutiesTasksAndResponsibilitiesId;
    }

    public Date getDateStart() {
        return dateStart;
    }

    public void setDateStart(Date dateStart) {
        this.dateStart = dateStart;
    }

    public Date getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(Date dateEnd) {
        this.dateEnd = dateEnd;
    }

    public Integer getRtDutiesId() {
        return rtDutiesId;
    }

    public void setRtDutiesId(Integer rtDutiesId) {
        this.rtDutiesId = rtDutiesId;
    }

    public DcDutiesTasksAndResponsibilitiesEntity getDcDutiesTasksAndResponsibilitiesEntity() {
        return dcDutiesTasksAndResponsibilitiesEntity;
    }

    public void setDcDutiesTasksAndResponsibilitiesEntity(DcDutiesTasksAndResponsibilitiesEntity dcDutiesTasksAndResponsibilitiesEntity) {
        this.dcDutiesTasksAndResponsibilitiesEntity = dcDutiesTasksAndResponsibilitiesEntity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RtDutiesTaskAndResponsibilitiesEntity)) return false;
        RtDutiesTaskAndResponsibilitiesEntity that = (RtDutiesTaskAndResponsibilitiesEntity) o;
        return Objects.equals(getId(), that.getId()) &&
                Objects.equals(getDcDutiesTasksAndResponsibilitiesId(), that.getDcDutiesTasksAndResponsibilitiesId()) &&
                Objects.equals(getDateStart(), that.getDateStart()) &&
                Objects.equals(getDateEnd(), that.getDateEnd()) &&
                Objects.equals(getRtDutiesId(), that.getRtDutiesId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getDcDutiesTasksAndResponsibilitiesId(), getDateStart(), getDateEnd(), getRtDutiesId());
    }
}
