package domain;

import javax.persistence.*;

@Entity
@Table(name = "DcDutiesPartition", schema = "dbo", catalog = "DcDuties")
public class DcDutiesPartitionEntity {
    private int dcDutiesPartitionId;
    private String dcDutiesPartitionName;

    @Id
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
