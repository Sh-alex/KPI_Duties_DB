package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.sql.Date;

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
    private int id;

    @Basic
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


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
        if (o == null || getClass() != o.getClass()) return false;

        RtDutiesTaskAndResponsibilitiesEntity that = (RtDutiesTaskAndResponsibilitiesEntity) o;

        if (id != that.id) return false;
        if (dateStart != null ? !dateStart.equals(that.dateStart) : that.dateStart != null) return false;
        if (dateEnd != null ? !dateEnd.equals(that.dateEnd) : that.dateEnd != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (dateStart != null ? dateStart.hashCode() : 0);
        result = 31 * result + (dateEnd != null ? dateEnd.hashCode() : 0);
        return result;
    }
}
