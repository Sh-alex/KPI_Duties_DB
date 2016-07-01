package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "DcDutiesType", schema = "dbo", catalog = "DcDuties")
public class DcDutiesTypeEntity {
    private int id;
    private String name;

    private Set<DcDutiesNameEntity> dcDutiesNameEntitys = new HashSet<>();

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



    @OneToMany(mappedBy = "dcDutiesTypeEntity", fetch = FetchType.LAZY)
    public Set<DcDutiesNameEntity> getDcDutiesNameEntitys() {
        return this.dcDutiesNameEntitys;
    }

    public void setDcDutiesNameEntitys(Set<DcDutiesNameEntity> dcDutiesNameEntity) {
        this.dcDutiesNameEntitys = dcDutiesNameEntity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DcDutiesTypeEntity that = (DcDutiesTypeEntity) o;

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
