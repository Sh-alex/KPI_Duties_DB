package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "DcCodeKP", schema = "dbo", catalog = "DcDuties")
public class DcCodeKpEntity {
    private int id;
    private String name;

    private Set<RtCodeEntity> rtCodeEntities = new HashSet<>();

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

    @OneToMany(mappedBy = "dcCodeKpEntity", fetch = FetchType.LAZY)
    public Set<RtCodeEntity> getRtCodeEntities() {
        return rtCodeEntities;
    }

    public void setRtCodeEntities(Set<RtCodeEntity> rtCodeEntities) {
        this.rtCodeEntities = rtCodeEntities;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DcCodeKpEntity that = (DcCodeKpEntity) o;

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
