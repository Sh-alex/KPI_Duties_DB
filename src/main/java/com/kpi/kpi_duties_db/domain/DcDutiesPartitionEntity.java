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
    private Integer id;

    @Basic
    @Column(name = "DcDutiesPartitionName")
    private String name;

    @OneToMany
    @JoinColumn(name="DcDutiesPartitionId")
    private Set<RtDutiesEntity> rtDutiesEntities;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

        if (id != that.id) return false;
        if (name != null ? !name.equals(that.name) : that.name != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }
}
