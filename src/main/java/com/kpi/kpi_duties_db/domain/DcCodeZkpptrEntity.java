package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.util.Set;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Entity
@Table(name = "DcCodeZKPPTR", schema = "dbo", catalog = "DcDuties")
public class DcCodeZkpptrEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;

    @Column(name = "Name")
    private String name;

    @OneToMany(mappedBy = "dcCodeZkpptrEntity")
    private Set<RtCodeEntity> rtCodeEntities;


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

        DcCodeZkpptrEntity that = (DcCodeZkpptrEntity) o;

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
