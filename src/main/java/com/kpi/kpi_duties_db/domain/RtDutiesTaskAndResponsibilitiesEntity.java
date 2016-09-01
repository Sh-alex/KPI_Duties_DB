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

    @Column(name = "DcDuties_TasksAndResponsibilitiesId", updatable = false, insertable = false)
    private Integer dcDutiesTasksAndResponsibilitiesId;

    @Column(name = "RtDutiesId", updatable = false, insertable = false)
    private Integer rtDutiesId;

    @Column(name = "DateStart")
    private Date dateStart;

    @Column(name = "DateEnd")
    private Date dateEnd;

    @ManyToOne
    @JoinColumn(name = "RtDutiesId")
    private RtDutiesEntity rtDutiesEntity;

    @ManyToOne
    @JoinColumn(name = "DcDuties_TasksAndResponsibilitiesId")
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

    public Integer getRtDutiesId() {
        return rtDutiesId;
    }

    public void setRtDutiesId(Integer rtDutiesId) {
        this.rtDutiesId = rtDutiesId;
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

    public RtDutiesEntity getRtDutiesEntity() {
        return rtDutiesEntity;
    }

    public void setRtDutiesEntity(RtDutiesEntity rtDutiesEntity) {
        this.rtDutiesEntity = rtDutiesEntity;
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
                Objects.equals(getRtDutiesId(), that.getRtDutiesId()) &&
                Objects.equals(getDateStart(), that.getDateStart()) &&
                Objects.equals(getDateEnd(), that.getDateEnd()) &&
                Objects.equals(getRtDutiesEntity(), that.getRtDutiesEntity()) &&
                Objects.equals(getDcDutiesTasksAndResponsibilitiesEntity(), that.getDcDutiesTasksAndResponsibilitiesEntity());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getDcDutiesTasksAndResponsibilitiesId(), getRtDutiesId(), getDateStart(), getDateEnd(), getRtDutiesEntity(), getDcDutiesTasksAndResponsibilitiesEntity());
    }
}
