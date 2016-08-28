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
    private Integer rtDutiesId;

    @Column(name = "DcDutiesPartitionId", insertable = false, updatable = false)
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

    @Column(name = "vcPreviosId")
    private Integer vcPreviosId;

    @Column(name = "vcActualityComment")
    private String vcActualityComment;

    @ManyToOne
    @JoinColumn(name = "DcDutiesNameId")
    private DcDutiesNameEntity dcDutiesNameEntity;

    @ManyToOne
    @JoinColumn(name = "DcDutiesPartitionId")
    private DcDutiesPartitionEntity dcDutiesPartitionEntity;

    @ManyToOne
    @JoinColumn(name = "ParentId")
    private RtDutiesEntity rtDutiesEntity;

    @OneToMany(mappedBy = "rtDutiesEntity")
    private Set<RtDutiesCodeEntity> rtDutiesCodeEntities;

    @OneToMany(mappedBy = "rtDutiesEntity")
    private Set<DutiesValidityDateEntity> dutiesValidityDateEntities;

    @OneToMany(mappedBy = "rtDutiesEntity")
    private Set<RtDutiesQualificationRequirementsEntity> rtDutiesQualificationRequirementsEntities;

    @OneToMany(mappedBy = "rtDutiesEntity")
    private Set<RtDutiesMustKnowEntity> rtDutiesMustKnowEntities;

    @OneToMany(mappedBy = "rtDutiesEntity")
    private Set<RtDutiesTaskAndResponsibilitiesEntity> rtDutiesTaskAndResponsibilitiesEntities;

    @OneToMany(mappedBy = "rtDutiesEntity")
    private Set<RtDutiesEntity> rtDutiesEntities;

    public Integer getRtDutiesId() {
        return rtDutiesId;
    }

    public void setRtDutiesId(Integer rtDutiesId) {
        this.rtDutiesId = rtDutiesId;
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

    public Integer getVcPreviosId() {
        return vcPreviosId;
    }

    public void setVcPreviosId(Integer vcPreviosId) {
        this.vcPreviosId = vcPreviosId;
    }

    public String getVcActualityComment() {
        return vcActualityComment;
    }

    public void setVcActualityComment(String vcActualityComment) {
        this.vcActualityComment = vcActualityComment;
    }

    public DcDutiesNameEntity getDcDutiesNameEntity() {
        return dcDutiesNameEntity;
    }

    public void setDcDutiesNameEntity(DcDutiesNameEntity dcDutiesNameEntity) {
        this.dcDutiesNameEntity = dcDutiesNameEntity;
    }

    public DcDutiesPartitionEntity getDcDutiesPartitionEntity() {
        return dcDutiesPartitionEntity;
    }

    public void setDcDutiesPartitionEntity(DcDutiesPartitionEntity dcDutiesPartitionEntity) {
        this.dcDutiesPartitionEntity = dcDutiesPartitionEntity;
    }

    public RtDutiesEntity getRtDutiesEntity() {
        return rtDutiesEntity;
    }

    public void setRtDutiesEntity(RtDutiesEntity rtDutiesEntity) {
        this.rtDutiesEntity = rtDutiesEntity;
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

    public Set<RtDutiesEntity> getRtDutiesEntities() {
        return rtDutiesEntities;
    }

    public void setRtDutiesEntities(Set<RtDutiesEntity> rtDutiesEntities) {
        this.rtDutiesEntities = rtDutiesEntities;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RtDutiesEntity)) return false;
        RtDutiesEntity that = (RtDutiesEntity) o;
        return Objects.equals(getRtDutiesId(), that.getRtDutiesId()) &&
                Objects.equals(getDcDutiesPartitionId(), that.getDcDutiesPartitionId()) &&
                Objects.equals(getRtDutiesName(), that.getRtDutiesName()) &&
                Objects.equals(getRtDutiesNameShort(), that.getRtDutiesNameShort()) &&
                Objects.equals(getParentId(), that.getParentId()) &&
                Objects.equals(getDcDutiesNameId(), that.getDcDutiesNameId()) &&
                Objects.equals(getVcChangeDate(), that.getVcChangeDate()) &&
                Objects.equals(getVcPreviosId(), that.getVcPreviosId()) &&
                Objects.equals(getVcActualityComment(), that.getVcActualityComment());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getRtDutiesId(), getDcDutiesPartitionId(), getRtDutiesName(), getRtDutiesNameShort(), getParentId(), getDcDutiesNameId(), getVcChangeDate(), getVcPreviosId(), getVcActualityComment());
    }
}
