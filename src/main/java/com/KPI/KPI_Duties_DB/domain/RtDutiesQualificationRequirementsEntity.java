package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "RtDuties_QualificationRequirements", schema = "dbo", catalog = "DcDuties")
public class RtDutiesQualificationRequirementsEntity {
    private int id;
    private Date dateStart;
    private Date dateEnd;

    private RtDutiesEntity rtDutiesEntity;
    private DcDutiesQualificationRequirementsEntity dcDutiesQualificationRequirementsEntity;

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
    @Column(name = "DateStart")
    public Date getDateStart() {
        return dateStart;
    }

    public void setDateStart(Date dateStart) {
        this.dateStart = dateStart;
    }

    @Basic
    @Column(name = "DateEnd")
    public Date getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(Date dateEnd) {
        this.dateEnd = dateEnd;
    }

    @ManyToOne
    @JoinColumn(name = "RtDutiesId")
    public RtDutiesEntity getRtDutiesEntity() {
        return rtDutiesEntity;
    }

    public void setRtDutiesEntity(RtDutiesEntity rtDutiesEntity) {
        this.rtDutiesEntity = rtDutiesEntity;
    }
    @ManyToOne
    @JoinColumn(name = "DcDuties_QualificationRequirementsId")
    public DcDutiesQualificationRequirementsEntity getDcDutiesQualificationRequirementsEntity() {
        return dcDutiesQualificationRequirementsEntity;
    }

    public void setDcDutiesQualificationRequirementsEntity(DcDutiesQualificationRequirementsEntity dcDutiesQualificationRequirementsEntity) {
        this.dcDutiesQualificationRequirementsEntity = dcDutiesQualificationRequirementsEntity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        RtDutiesQualificationRequirementsEntity that = (RtDutiesQualificationRequirementsEntity) o;

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
