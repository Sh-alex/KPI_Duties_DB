package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Entity
@Table(name = "RtDuties_MustKnow", schema = "dbo", catalog = "DcDuties")
public class RtDutiesMustKnowEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @Column(name = "DcDuties_MustKnowId")
    private Integer dcDutiesMustKnowId;

    @Column(name = "DateStart")
    private Date dateStart;

    @Column(name = "DateEnd")
    private Date dateEnd;

    @Column(name = "RtDutiesId")
    private Integer rtDutiesId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getDcDutiesMustKnowId() {
        return dcDutiesMustKnowId;
    }

    public void setDcDutiesMustKnowId(Integer dcDutiesMustKnowId) {
        this.dcDutiesMustKnowId = dcDutiesMustKnowId;
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

    public Integer getRtDutiesId() {
        return rtDutiesId;
    }

    public void setRtDutiesId(Integer rtDutiesId) {
        this.rtDutiesId = rtDutiesId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RtDutiesMustKnowEntity)) return false;
        RtDutiesMustKnowEntity that = (RtDutiesMustKnowEntity) o;
        return Objects.equals(getId(), that.getId()) &&
                Objects.equals(getDcDutiesMustKnowId(), that.getDcDutiesMustKnowId()) &&
                Objects.equals(getDateStart(), that.getDateStart()) &&
                Objects.equals(getDateEnd(), that.getDateEnd()) &&
                Objects.equals(getRtDutiesId(), that.getRtDutiesId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getDcDutiesMustKnowId(), getDateStart(), getDateEnd(), getRtDutiesId());
    }
}
