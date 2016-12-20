package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.util.Objects;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Entity
@Table(name = "DcDutiesName", schema = "dbo", catalog = "DcDuties")
public class DcDutiesNameEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;

    @Column(name = "Name")
    private String name;

    @Column(name = "TypeId")
    private Integer typeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TypeId", insertable = false, updatable = false)
    private DcDutiesTypeEntity dcDutiesTypeEntity;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public DcDutiesTypeEntity getDcDutiesTypeEntity() {
        return dcDutiesTypeEntity;
    }

    public void setDcDutiesTypeEntity(DcDutiesTypeEntity dcDutiesTypeEntity) {
        this.dcDutiesTypeEntity = dcDutiesTypeEntity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DcDutiesNameEntity)) return false;
        DcDutiesNameEntity that = (DcDutiesNameEntity) o;
        return getId() == that.getId() &&
                Objects.equals(getName(), that.getName()) &&
                Objects.equals(getTypeId(), that.getTypeId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getTypeId());
    }
}
