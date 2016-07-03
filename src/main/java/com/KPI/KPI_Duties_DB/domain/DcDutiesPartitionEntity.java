package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "DcDutiesPartition", schema = "dbo", catalog = "DcDuties")
public class DcDutiesPartitionEntity {
    private int dcDutiesPartitionId;
    private String dcDutiesPartitionName;

    private Set<RtDutiesEntity> rtDutiesEntities = new HashSet<>();

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "DcDutiesPartitionId")
    public int getDcDutiesPartitionId() {
        return dcDutiesPartitionId;
    }

    public void setDcDutiesPartitionId(int dcDutiesPartitionId) {
        this.dcDutiesPartitionId = dcDutiesPartitionId;
    }

    @Basic
    @Column(name = "DcDutiesPartitionName")
    public String getDcDutiesPartitionName() {
        return dcDutiesPartitionName;
    }

    public void setDcDutiesPartitionName(String dcDutiesPartitionName) {
        this.dcDutiesPartitionName = dcDutiesPartitionName;
    }

    @OneToMany(mappedBy = "dcDutiesPartitionEntity", fetch = FetchType.LAZY)
    public Set<RtDutiesEntity> getRtDutiesEntities() {
        return rtDutiesEntities;
    }

    public void setRtDutiesEntities(Set<RtDutiesEntity> rtDutiesEntities) {
        this.rtDutiesEntities = rtDutiesEntities;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DcDutiesPartitionEntity that = (DcDutiesPartitionEntity) o;

        if (dcDutiesPartitionId != that.dcDutiesPartitionId) return false;
        if (dcDutiesPartitionName != null ? !dcDutiesPartitionName.equals(that.dcDutiesPartitionName) : that.dcDutiesPartitionName != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = dcDutiesPartitionId;
        result = 31 * result + (dcDutiesPartitionName != null ? dcDutiesPartitionName.hashCode() : 0);
        return result;
    }
}
