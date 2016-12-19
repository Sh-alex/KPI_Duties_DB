package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by Yaroslav on 01.12.2016.
 */
@Entity
@Table(name = "Project", schema = "dbo", catalog = "Permissions_zhenya")
public class Project {
    private int id;
    private String name;
//    private Set<PermissionsForProject> permissionsForProjects;

//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project")
//    public Set<PermissionsForProject> getPermissionsForProjects() {
//        return permissionsForProjects;
//    }
//
//    public void setPermissionsForProjects(Set<PermissionsForProject> permissionsForProjects) {
//        this.permissionsForProjects = permissionsForProjects;
//    }

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Project project = (Project) o;

        if (id != project.id) return false;
        if (name != null ? !name.equals(project.name) : project.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }
}
