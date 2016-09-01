package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;
import java.util.Set;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Entity
@Table(name = "RtDuties", schema = "dbo", catalog = "DcDuties")
public class RtDutiesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RtDutiesId")
    private Integer id;

    @Column(name = "DcDutiesPartitionId")
    private Integer dcDutiesPartitionId;

    @Column(name = "RtDutiesName")
    private String rtDutiesName;

    @Column(name = "RtDutiesNameShort")
    private String rtDutiesNameShort;

    @Column(name = "ParentId", insertable = false, updatable = false)
    private Integer parentId;

    @Column(name = "DcDutiesNameId", insertable = false, updatable = false)
    private Integer dcDutiesNameId;

    @Column(name = "vcChangeDate")
    private Timestamp vcChangeDate;


    @ManyToOne
    @JoinColumn(name = "DcDutiesNameId")
    private DcDutiesNameEntity dcDutiesNameEntity;

    /*@ManyToOne
    @JoinColumn(name = "DcDutiesPartitionId")
    private DcDutiesPartitionEntity dcDutiesPartitionEntity;*/

    @ManyToOne
    @JoinColumn(name = "ParentId")
    private RtDutiesEntity rtDutiesEntity;

    @OneToMany(mappedBy = "rtDutiesEntity")
    private Set<RtDutiesEntity> rtDutiesEntities;

    @OneToMany(mappedBy = "rtDutiesEntity")
    private Set<RtDutiesCodeEntity> rtDutiesCodeEntities;

    @OneToMany
    @JoinColumn(name = "RtDutiesId")
    private Set<DutiesValidityDateEntity> dutiesValidityDateEntities;

    @OneToMany
    @JoinColumn(name = "RtDutiesId")
    private Set<RtDutiesQualificationRequirementsEntity> rtDutiesQualificationRequirementsEntities;

    @OneToMany
    @JoinColumn(name = "RtDutiesId")
    private Set<RtDutiesMustKnowEntity> rtDutiesMustKnowEntities;

    @OneToMany(mappedBy = "rtDutiesEntity")
    private Set<RtDutiesTaskAndResponsibilitiesEntity> rtDutiesTaskAndResponsibilitiesEntities;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getDcDutiesPartitionId() {
        return dcDutiesPartitionId;
    }

    public void setDcDutiesPartitionId(Integer dcDutiesPartitionId) {
        this.dcDutiesPartitionId = dcDutiesPartitionId;
    }

    public String getRtDutiesName() {
        return rtDutiesName;
    }

    public void setRtDutiesName(String rtDutiesName) {
        this.rtDutiesName = rtDutiesName;
    }

    public String getRtDutiesNameShort() {
        return rtDutiesNameShort;
    }

    public void setRtDutiesNameShort(String rtDutiesNameShort) {
        this.rtDutiesNameShort = rtDutiesNameShort;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public Integer getDcDutiesNameId() {
        return dcDutiesNameId;
    }

    public void setDcDutiesNameId(Integer dcDutiesNameId) {
        this.dcDutiesNameId = dcDutiesNameId;
    }

    public Timestamp getVcChangeDate() {
        return vcChangeDate;
    }

    public void setVcChangeDate(Timestamp vcChangeDate) {
        this.vcChangeDate = vcChangeDate;
    }

    public DcDutiesNameEntity getDcDutiesNameEntity() {
        return dcDutiesNameEntity;
    }

    public void setDcDutiesNameEntity(DcDutiesNameEntity dcDutiesNameEntity) {
        this.dcDutiesNameEntity = dcDutiesNameEntity;
    }

    public RtDutiesEntity getRtDutiesEntity() {
        return rtDutiesEntity;
    }

    public void setRtDutiesEntity(RtDutiesEntity rtDutiesEntity) {
        this.rtDutiesEntity = rtDutiesEntity;
    }

    public Set<RtDutiesEntity> getRtDutiesEntities() {
        return rtDutiesEntities;
    }

    public void setRtDutiesEntities(Set<RtDutiesEntity> rtDutiesEntities) {
        this.rtDutiesEntities = rtDutiesEntities;
    }

    public Set<RtDutiesCodeEntity> getRtDutiesCodeEntities() {
        return rtDutiesCodeEntities;
    }

    public void setRtDutiesCodeEntities(Set<RtDutiesCodeEntity> rtDutiesCodeEntities) {
        this.rtDutiesCodeEntities = rtDutiesCodeEntities;
    }

    public Set<DutiesValidityDateEntity> getDutiesValidityDateEntities() {
        return dutiesValidityDateEntities;
    }

    public void setDutiesValidityDateEntities(Set<DutiesValidityDateEntity> dutiesValidityDateEntities) {
        this.dutiesValidityDateEntities = dutiesValidityDateEntities;
    }

    public Set<RtDutiesQualificationRequirementsEntity> getRtDutiesQualificationRequirementsEntities() {
        return rtDutiesQualificationRequirementsEntities;
    }

    public void setRtDutiesQualificationRequirementsEntities(Set<RtDutiesQualificationRequirementsEntity> rtDutiesQualificationRequirementsEntities) {
        this.rtDutiesQualificationRequirementsEntities = rtDutiesQualificationRequirementsEntities;
    }

    public Set<RtDutiesMustKnowEntity> getRtDutiesMustKnowEntities() {
        return rtDutiesMustKnowEntities;
    }

    public void setRtDutiesMustKnowEntities(Set<RtDutiesMustKnowEntity> rtDutiesMustKnowEntities) {
        this.rtDutiesMustKnowEntities = rtDutiesMustKnowEntities;
    }

    public Set<RtDutiesTaskAndResponsibilitiesEntity> getRtDutiesTaskAndResponsibilitiesEntities() {
        return rtDutiesTaskAndResponsibilitiesEntities;
    }

    public void setRtDutiesTaskAndResponsibilitiesEntities(Set<RtDutiesTaskAndResponsibilitiesEntity> rtDutiesTaskAndResponsibilitiesEntities) {
        this.rtDutiesTaskAndResponsibilitiesEntities = rtDutiesTaskAndResponsibilitiesEntities;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RtDutiesEntity)) return false;
        RtDutiesEntity entity = (RtDutiesEntity) o;
        return Objects.equals(getId(), entity.getId()) &&
                Objects.equals(getDcDutiesPartitionId(), entity.getDcDutiesPartitionId()) &&
                Objects.equals(getRtDutiesName(), entity.getRtDutiesName()) &&
                Objects.equals(getRtDutiesNameShort(), entity.getRtDutiesNameShort()) &&
                Objects.equals(getParentId(), entity.getParentId()) &&
                Objects.equals(getDcDutiesNameId(), entity.getDcDutiesNameId()) &&
                Objects.equals(getVcChangeDate(), entity.getVcChangeDate()) &&
                Objects.equals(getDcDutiesNameEntity(), entity.getDcDutiesNameEntity()) &&
                Objects.equals(getRtDutiesEntity(), entity.getRtDutiesEntity()) &&
                Objects.equals(getRtDutiesEntities(), entity.getRtDutiesEntities()) &&
                Objects.equals(getRtDutiesCodeEntities(), entity.getRtDutiesCodeEntities()) &&
                Objects.equals(getDutiesValidityDateEntities(), entity.getDutiesValidityDateEntities()) &&
                Objects.equals(getRtDutiesQualificationRequirementsEntities(), entity.getRtDutiesQualificationRequirementsEntities()) &&
                Objects.equals(getRtDutiesMustKnowEntities(), entity.getRtDutiesMustKnowEntities()) &&
                Objects.equals(getRtDutiesTaskAndResponsibilitiesEntities(), entity.getRtDutiesTaskAndResponsibilitiesEntities());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getDcDutiesPartitionId(), getRtDutiesName(), getRtDutiesNameShort(), getParentId(), getDcDutiesNameId(), getVcChangeDate(), getDcDutiesNameEntity(), getRtDutiesEntity(), getRtDutiesEntities(), getRtDutiesCodeEntities(), getDutiesValidityDateEntities(), getRtDutiesQualificationRequirementsEntities(), getRtDutiesMustKnowEntities(), getRtDutiesTaskAndResponsibilitiesEntities());
    }
}
