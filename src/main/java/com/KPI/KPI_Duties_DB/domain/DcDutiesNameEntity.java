package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "DcDutiesName", schema = "dbo", catalog = "DcDuties")
public class DcDutiesNameEntity {
    private int id;
    private String name;

    private DcDutiesTypeEntity dcDutiesTypeEntity;

    private Set<RtDutiesEntity> rtDutiesEntities = new HashSet<>();

    @Id
    @Column(name = "Id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "Name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @OneToMany(mappedBy = "dcDutiesNameEntity", fetch = FetchType.LAZY)
    public Set<RtDutiesEntity> getRtDutiesEntities() {
        return rtDutiesEntities;
    }

    public void setRtDutiesEntities(Set<RtDutiesEntity> rtDutiesEntities) {
        this.rtDutiesEntities = rtDutiesEntities;
    }

    @ManyToOne
    @JoinColumn(name = "TypeId")
    public DcDutiesTypeEntity getDcDutiesTypeEntity() {
        return this.dcDutiesTypeEntity;
    }


    public void setDcDutiesTypeEntity(DcDutiesTypeEntity dcDutiesTypeEntity) {
        this.dcDutiesTypeEntity = dcDutiesTypeEntity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DcDutiesNameEntity that = (DcDutiesNameEntity) o;

        if (id != that.id) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }
}
