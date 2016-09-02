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

    @Column(name = "DcDutiesNameId")
    private Integer dcDutiesNameId;

    @Column(name = "vcChangeDate")
    private Timestamp vcChangeDate;


    @OneToMany(mappedBy = "rtDutiesEntity", cascade = CascadeType.ALL)
    private Set<RtDutiesEntity> rtDutiesEntities;

    @ManyToOne
    @JoinColumn( name = "ParentId")
    private RtDutiesEntity rtDutiesEntity;

    @OneToMany(mappedBy = "rtDutiesEntity", cascade = CascadeType.ALL)
    private Set<RtDutiesCodeEntity> rtDutiesCodeEntities;

    @OneToMany(mappedBy = "rtDutiesEntity", cascade = CascadeType.ALL)
    private Set<DutiesValidityDateEntity> dutiesValidityDateEntities;

    @OneToMany(mappedBy = "rtDutiesEntity", cascade = CascadeType.ALL)
    private Set<RtDutiesQualificationRequirementsEntity> rtDutiesQualificationRequirementsEntities;

    @OneToMany(mappedBy = "rtDutiesEntity", cascade = CascadeType.ALL)
    private Set<RtDutiesMustKnowEntity> rtDutiesMustKnowEntities;

    @OneToMany(mappedBy = "rtDutiesEntity", cascade = CascadeType.ALL)
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

    public Set<RtDutiesEntity> getRtDutiesEntities() {
        return rtDutiesEntities;
    }

    public void setRtDutiesEntities(Set<RtDutiesEntity> rtDutiesEntities) {
        this.rtDutiesEntities = rtDutiesEntities;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RtDutiesEntity)) return false;
        RtDutiesEntity that = (RtDutiesEntity) o;
        return Objects.equals(getId(), that.getId()) &&
                Objects.equals(getDcDutiesPartitionId(), that.getDcDutiesPartitionId()) &&
                Objects.equals(getRtDutiesName(), that.getRtDutiesName()) &&
                Objects.equals(getRtDutiesNameShort(), that.getRtDutiesNameShort()) &&
                Objects.equals(getDcDutiesNameId(), that.getDcDutiesNameId()) &&
                Objects.equals(getVcChangeDate(), that.getVcChangeDate());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getDcDutiesPartitionId(), getRtDutiesName(), getRtDutiesNameShort(), getDcDutiesNameId(), getVcChangeDate());
    }
}
