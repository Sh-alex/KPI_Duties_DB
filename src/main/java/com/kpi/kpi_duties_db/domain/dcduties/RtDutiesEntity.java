package com.kpi.kpi_duties_db.domain.dcduties;

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
    private String name;

    @Column(name = "RtDutiesNameShort")
    private String nameShort;

    @Column(name = "DcDutiesNameId")
    private Integer dcDutiesNameId;

    @Column(name = "ParentId")
    private Integer parentId;

    @Column(name = "vcChangeDate")
    private Timestamp vcChangeDate;

    @Column(name = "mainInfoDocRefName")
    private String mainInfoDocRefName;

    @Column(name = "mainInfoDocRefLink")
    private String mainInfoDocRefLink;

    @Column(name = "descriptionDocRefName")
    private String descriptionDocRefName;

    @Column(name = "descriptionDocRefLink")
    private String descriptionDocRefLink;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DcDutiesNameId", insertable = false, updatable = false)
    private DcDutiesNameEntity dcDutiesNameEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DcDutiesPartitionId", insertable = false, updatable = false)
    private DcDutiesPartitionEntity dcDutiesPartitionEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ParentId", insertable = false, updatable = false)
    private RtDutiesEntity parentEntity;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "ParentId")
    private Set<RtDutiesEntity> rtDutiesEntities;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "RtDutiesId")
    private Set<RtDutiesCodeEntity> rtDutiesCodeEntities;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "RtDutiesId")
    private Set<DutiesValidityDateEntity> dutiesValidityDateEntities;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "RtDutiesId")
    private Set<RtDutiesQualificationRequirementsEntity> rtDutiesQualificationRequirementsEntities;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "RtDutiesId")
    private Set<RtDutiesMustKnowEntity> rtDutiesMustKnowEntities;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "RtDutiesId")
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameShort() {
        return nameShort;
    }

    public void setNameShort(String nameShort) {
        this.nameShort = nameShort;
    }

    public Integer getDcDutiesNameId() {
        return dcDutiesNameId;
    }

    public void setDcDutiesNameId(Integer dcDutiesNameId) {
        this.dcDutiesNameId = dcDutiesNameId;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public RtDutiesEntity getParentEntity() {
        return parentEntity;
    }

    public void setParentEntity(RtDutiesEntity parentEntity) {
        this.parentEntity = parentEntity;
    }

    public Timestamp getVcChangeDate() {
        return vcChangeDate;
    }

    public void setVcChangeDate(Timestamp vcChangeDate) {
        this.vcChangeDate = vcChangeDate;
    }

    public String getMainInfoDocRefName() {
        return mainInfoDocRefName;
    }

    public void setMainInfoDocRefName(String mainInfoDocRefName) {
        this.mainInfoDocRefName = mainInfoDocRefName;
    }

    public String getMainInfoDocRefLink() {
        return mainInfoDocRefLink;
    }

    public void setMainInfoDocRefLink(String mainInfoDocRefLink) {
        this.mainInfoDocRefLink = mainInfoDocRefLink;
    }

    public String getDescriptionDocRefName() {
        return descriptionDocRefName;
    }

    public void setDescriptionDocRefName(String descriptionDocRefName) {
        this.descriptionDocRefName = descriptionDocRefName;
    }

    public String getDescriptionDocRefLink() {
        return descriptionDocRefLink;
    }

    public void setDescriptionDocRefLink(String descriptionDocRefLink) {
        this.descriptionDocRefLink = descriptionDocRefLink;
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
        RtDutiesEntity that = (RtDutiesEntity) o;
        return Objects.equals(getId(), that.getId()) &&
                Objects.equals(getDcDutiesPartitionId(), that.getDcDutiesPartitionId()) &&
                Objects.equals(getName(), that.getName()) &&
                Objects.equals(getNameShort(), that.getNameShort()) &&
                Objects.equals(getDcDutiesNameId(), that.getDcDutiesNameId()) &&
                Objects.equals(getParentId(), that.getParentId()) &&
                Objects.equals(getMainInfoDocRefName(), that.getMainInfoDocRefName()) &&
                Objects.equals(getMainInfoDocRefLink(), that.getMainInfoDocRefLink()) &&
                Objects.equals(getDescriptionDocRefName(), that.getDescriptionDocRefName()) &&
                Objects.equals(getDescriptionDocRefLink(), that.getDescriptionDocRefLink());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getDcDutiesPartitionId(), getName(), getNameShort(), getDcDutiesNameId(), getParentId(), getMainInfoDocRefName(), getMainInfoDocRefLink(), getDescriptionDocRefName(), getDescriptionDocRefLink());
    }
}