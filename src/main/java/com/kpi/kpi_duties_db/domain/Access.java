package com.kpi.kpi_duties_db.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.codehaus.jackson.annotate.JsonProperty;

import javax.persistence.*;

/**
 * Created by Yaroslav on 01.12.2016.
 */
@Entity
public class Access {
    private int id;
    private String name;
    private PermissionsForProject permissionsForProject;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name")
    @JsonProperty("accessName")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Access access = (Access) o;

        if (id != access.id) return false;
        if (name != null ? !name.equals(access.name) : access.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }

    @OneToOne(mappedBy = "access")
    @JsonIgnore
    public PermissionsForProject getPermissionsForProject() {
        return permissionsForProject;
    }

    public void setPermissionsForProject(PermissionsForProject permissionsForProject) {
        this.permissionsForProject = permissionsForProject;
    }
}
