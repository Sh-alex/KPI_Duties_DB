package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.util.Objects;

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

    @Column(name = "DcDutiesPartitionName")
    private String name;


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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DcDutiesPartitionEntity)) return false;
        DcDutiesPartitionEntity entity = (DcDutiesPartitionEntity) o;
        return Objects.equals(getId(), entity.getId()) &&
                Objects.equals(getName(), entity.getName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName());
    }
}
