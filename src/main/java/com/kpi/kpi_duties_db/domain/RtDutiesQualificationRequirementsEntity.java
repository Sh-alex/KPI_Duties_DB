package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Entity
@Table(name = "RtDuties_QualificationRequirements", schema = "dbo", catalog = "DcDuties")
public class RtDutiesQualificationRequirementsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @Column(name = "DcDuties_QualificationRequirementsId", insertable = false, updatable = false)
    private Integer dcDutiesQualificationRequirementsId;

    @Column(name = "RtDutiesId", insertable = false, updatable = false)
    private Integer rtDutiesId;

    @Column(name = "DateStart")
    private Date dateStart;

    @Column(name = "DateEnd")
    private Date dateEnd;

    @ManyToOne
    @JoinColumn(name = "RtDutiesId")
    private RtDutiesEntity rtDutiesEntity;

    @ManyToOne
    @JoinColumn(name = "DcDuties_QualificationRequirementsId")
    private DcDutiesQualificationRequirementsEntity dcDutiesQualificationRequirementsEntity;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getDcDutiesQualificationRequirementsId() {
        return dcDutiesQualificationRequirementsId;
    }

    public void setDcDutiesQualificationRequirementsId(Integer dcDutiesQualificationRequirementsId) {
        this.dcDutiesQualificationRequirementsId = dcDutiesQualificationRequirementsId;
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

    public DcDutiesQualificationRequirementsEntity getDcDutiesQualificationRequirementsEntity() {
        return dcDutiesQualificationRequirementsEntity;
    }

    public void setDcDutiesQualificationRequirementsEntity(DcDutiesQualificationRequirementsEntity dcDutiesQualificationRequirementsEntity) {
        this.dcDutiesQualificationRequirementsEntity = dcDutiesQualificationRequirementsEntity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RtDutiesQualificationRequirementsEntity)) return false;
        RtDutiesQualificationRequirementsEntity that = (RtDutiesQualificationRequirementsEntity) o;
        return Objects.equals(getId(), that.getId()) &&
                Objects.equals(getDcDutiesQualificationRequirementsId(), that.getDcDutiesQualificationRequirementsId()) &&
                Objects.equals(getRtDutiesId(), that.getRtDutiesId()) &&
                Objects.equals(getDateStart(), that.getDateStart()) &&
                Objects.equals(getDateEnd(), that.getDateEnd()) &&
                Objects.equals(getRtDutiesEntity(), that.getRtDutiesEntity()) &&
                Objects.equals(getDcDutiesQualificationRequirementsEntity(), that.getDcDutiesQualificationRequirementsEntity());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getDcDutiesQualificationRequirementsId(), getRtDutiesId(), getDateStart(), getDateEnd(), getRtDutiesEntity(), getDcDutiesQualificationRequirementsEntity());
    }
}
