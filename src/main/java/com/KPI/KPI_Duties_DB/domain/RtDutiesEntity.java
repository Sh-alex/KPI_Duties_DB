package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "RtDuties", schema = "dbo", catalog = "DcDuties")
public class RtDutiesEntity {
    private int rtDutiesId;
    private String rtDutiesName;
    private String rtDutiesNameShort;
    private Timestamp vcChangeDate;
    private Integer vcPreviosId;
    private String vcActualityComment;

    private DcDutiesNameEntity dcDutiesNameEntity;
    private DcDutiesPartitionEntity dcDutiesPartitionEntity;
    private RtDutiesEntity rtDutiesEntity;

    private Set<RtDutiesCodeEntity> rtDutiesCodeEntities = new HashSet<>();
    private Set<DutiesValidityDateEntity> dutiesValidityDateEntities = new HashSet<>();
    private Set<RtDutiesQualificationRequirementsEntity> rtDutiesQualificationRequirementsEntities = new HashSet<>();
    private Set<RtDutiesMustKnowEntity> rtDutiesMustKnowEntities = new HashSet<>();
    private Set<RtDutiesTaskAndResponsibilitiesEntity> rtDutiesTaskAndResponsibilitiesEntities = new HashSet<>();
    private Set<RtDutiesEntity> rtDutiesEntities = new HashSet<>();

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "RtDutiesId")
    public int getRtDutiesId() {
        return rtDutiesId;
    }

    public void setRtDutiesId(int rtDutiesId) {
        this.rtDutiesId = rtDutiesId;
    }

    @Basic
    @Column(name = "RtDutiesName")
    public String getRtDutiesName() {
        return rtDutiesName;
    }

    public void setRtDutiesName(String rtDutiesName) {
        this.rtDutiesName = rtDutiesName;
    }

    @Basic
    @Column(name = "RtDutiesNameShort")
    public String getRtDutiesNameShort() {
        return rtDutiesNameShort;
    }

    public void setRtDutiesNameShort(String rtDutiesNameShort) {
        this.rtDutiesNameShort = rtDutiesNameShort;
    }

    @Basic
    @Column(name = "vcChangeDate")
    public Timestamp getVcChangeDate() {
        return vcChangeDate;
    }

    public void setVcChangeDate(Timestamp vcChangeDate) {
        this.vcChangeDate = vcChangeDate;
    }

    @Basic
    @Column(name = "vcPreviosId")
    public Integer getVcPreviosId() {
        return vcPreviosId;
    }

    public void setVcPreviosId(Integer vcPreviosId) {
        this.vcPreviosId = vcPreviosId;
    }

    @Basic
    @Column(name = "vcActualityComment")
    public String getVcActualityComment() {
        return vcActualityComment;
    }

    public void setVcActualityComment(String vcActualityComment) {
        this.vcActualityComment = vcActualityComment;
    }

    @OneToMany(mappedBy = "rtDutiesEntity", fetch = FetchType.LAZY)
    public Set<RtDutiesCodeEntity> getRtDutiesCodeEntities() {
        return this.rtDutiesCodeEntities;
    }

    public void setRtDutiesCodeEntities(Set<RtDutiesCodeEntity> rtDutiesCodeEntities) {
        this.rtDutiesCodeEntities = rtDutiesCodeEntities;
    }
    @OneToMany(mappedBy = "rtDutiesEntity", fetch = FetchType.LAZY)
    public Set<DutiesValidityDateEntity> getDutiesValidityDateEntities() {
        return dutiesValidityDateEntities;
    }

    public void setDutiesValidityDateEntities(Set<DutiesValidityDateEntity> dutiesValidityDateEntities) {
        this.dutiesValidityDateEntities = dutiesValidityDateEntities;
    }

    @OneToMany(mappedBy = "rtDutiesEntity", fetch = FetchType.LAZY)
    public Set<RtDutiesQualificationRequirementsEntity> getRtDutiesQualificationRequirementsEntities() {
        return rtDutiesQualificationRequirementsEntities;
    }

    public void setRtDutiesQualificationRequirementsEntities(Set<RtDutiesQualificationRequirementsEntity> rtDutiesQualificationRequirementsEntities) {
        this.rtDutiesQualificationRequirementsEntities = rtDutiesQualificationRequirementsEntities;
    }

    @OneToMany(mappedBy = "rtDutiesEntity", fetch = FetchType.LAZY)
    public Set<RtDutiesMustKnowEntity> getRtDutiesMustKnowEntities() {
        return rtDutiesMustKnowEntities;
    }

    public void setRtDutiesMustKnowEntities(Set<RtDutiesMustKnowEntity> rtDutiesMustKnowEntities) {
        this.rtDutiesMustKnowEntities = rtDutiesMustKnowEntities;
    }

    @OneToMany(mappedBy = "rtDutiesEntity", fetch = FetchType.LAZY)
    public Set<RtDutiesTaskAndResponsibilitiesEntity> getRtDutiesTaskAndResponsibilitiesEntities() {
        return rtDutiesTaskAndResponsibilitiesEntities;
    }

    public void setRtDutiesTaskAndResponsibilitiesEntities(Set<RtDutiesTaskAndResponsibilitiesEntity> rtDutiesTaskAndResponsibilitiesEntities) {
        this.rtDutiesTaskAndResponsibilitiesEntities = rtDutiesTaskAndResponsibilitiesEntities;
    }
    @OneToMany(mappedBy = "rtDutiesEntity", fetch = FetchType.LAZY)
    public Set<RtDutiesEntity> getRtDutiesEntities() {
        return rtDutiesEntities;
    }

    public void setRtDutiesEntities(Set<RtDutiesEntity> rtDutiesEntities) {
        this.rtDutiesEntities = rtDutiesEntities;
    }
    @ManyToOne
    @JoinColumn(name = "ParentId")
    public RtDutiesEntity getRtDutiesEntity() {
        return rtDutiesEntity;
    }

    public void setRtDutiesEntity(RtDutiesEntity rtDutiesEntity) {
        this.rtDutiesEntity = rtDutiesEntity;
    }

    @ManyToOne
    @JoinColumn(name = "DcDutiesNameId")
    public DcDutiesNameEntity getDcDutiesNameEntity() {
        return dcDutiesNameEntity;
    }

    public void setDcDutiesNameEntity(DcDutiesNameEntity dcDutiesNameEntity) {
        this.dcDutiesNameEntity = dcDutiesNameEntity;
    }
    @ManyToOne
    @JoinColumn(name = "DcDutiesPartitionId")
    public DcDutiesPartitionEntity getDcDutiesPartitionEntity() {
        return dcDutiesPartitionEntity;
    }

    public void setDcDutiesPartitionEntity(DcDutiesPartitionEntity dcDutiesPartitionEntity) {
        this.dcDutiesPartitionEntity = dcDutiesPartitionEntity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        RtDutiesEntity that = (RtDutiesEntity) o;

        if (rtDutiesId != that.rtDutiesId) return false;
        if (rtDutiesName != null ? !rtDutiesName.equals(that.rtDutiesName) : that.rtDutiesName != null) return false;
        if (rtDutiesNameShort != null ? !rtDutiesNameShort.equals(that.rtDutiesNameShort) : that.rtDutiesNameShort != null)
            return false;
        if (vcChangeDate != null ? !vcChangeDate.equals(that.vcChangeDate) : that.vcChangeDate != null) return false;
        if (vcPreviosId != null ? !vcPreviosId.equals(that.vcPreviosId) : that.vcPreviosId != null) return false;
        if (vcActualityComment != null ? !vcActualityComment.equals(that.vcActualityComment) : that.vcActualityComment != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = rtDutiesId;
        result = 31 * result + (rtDutiesName != null ? rtDutiesName.hashCode() : 0);
        result = 31 * result + (rtDutiesNameShort != null ? rtDutiesNameShort.hashCode() : 0);
        result = 31 * result + (vcChangeDate != null ? vcChangeDate.hashCode() : 0);
        result = 31 * result + (vcPreviosId != null ? vcPreviosId.hashCode() : 0);
        result = 31 * result + (vcActualityComment != null ? vcActualityComment.hashCode() : 0);
        return result;
    }
}
