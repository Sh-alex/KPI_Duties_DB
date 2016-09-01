package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.util.Set;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Entity
@Table(name = "DcDutiesPartition", schema = "dbo", catalog = "DcDuties")
public class DcDutiesPartitionEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "DcDutiesPartitionId")
    private Integer dcDutiesPartitionId;

    @Basic
    @Column(name = "DcDutiesPartitionName")
    private String dcDutiesPartitionName;

    @OneToMany(mappedBy = "dcDutiesPartitionEntity")
    private Set<RtDutiesEntity> rtDutiesEntities;


    public Integer getDcDutiesPartitionId() {
        return dcDutiesPartitionId;
    }

    public void setDcDutiesPartitionId(Integer dcDutiesPartitionId) {
        this.dcDutiesPartitionId = dcDutiesPartitionId;
    }


    public String getDcDutiesPartitionName() {
        return dcDutiesPartitionName;
    }

    public void setDcDutiesPartitionName(String dcDutiesPartitionName) {
        this.dcDutiesPartitionName = dcDutiesPartitionName;
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
