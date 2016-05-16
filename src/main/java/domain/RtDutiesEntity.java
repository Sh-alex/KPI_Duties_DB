package domain;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "RtDuties", schema = "dbo", catalog = "DcDuties")
public class RtDutiesEntity {
    private int rtDutiesId;
    private String rtDutiesName;
    private String rtDutiesNameShort;
    private Timestamp vcChangeDate;
    private Integer vcPreviosId;
    private String vcActualityComment;

    @Id
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
