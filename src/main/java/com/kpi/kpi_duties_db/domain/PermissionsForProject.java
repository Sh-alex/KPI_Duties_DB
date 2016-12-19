package com.kpi.kpi_duties_db.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;


import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * Created by Yaroslav on 01.12.2016.
 */
@Entity
@Table(name = "Permissions_For_Project", schema = "dbo", catalog = "Permissions_zhenya")
public class PermissionsForProject {
    private int id;
    private boolean isTemporary;
    private Date startDate;
    private Date endDate;
    private Permissions permission;
    private Access access;
    private Set<FormState> formStates;
    private Set<ControlState> controlStates;


//    private int id_LogicalAccess;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "permissionsForProject")
    @JsonIgnore
    public Set<FormState> getFormStates() {
        return formStates;
    }

    public void setFormStates(Set<FormState> formStates) {
        this.formStates = formStates;
    }



    @OneToOne
    @JoinColumn(name = "id_permissions", insertable = false, updatable = false)
    @JsonIgnore
    public Permissions getPermission() {
        return permission;
    }

    public void setPermission(Permissions permission) {
        this.permission = permission;
    }
//    private Project project;
//    private List<FormState> formStates;
//
//    @OneToMany(fetch = FetchType.EAGER, mappedBy = "permissionsForProject")
//    @JsonIgnore
//    public List<FormState> getFormStates() {
//        return formStates;
//    }

//    public void setFormStates(List<FormState> formStates) {
//        this.formStates = formStates;
//    }

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name= "project_id", nullable=false)
//    public Project getProject() {
//        return project;
//    }
//
//    public void setProject(Project project) {
//        this.project = project;
//    }





//    @Column(name = "id_LogicalAccess")
//    public int getId_LogicalAccess() {
//        return id_LogicalAccess;
//    }
//
//    public void setId_LogicalAccess(int id_LogicalAccess) {
//        this.id_LogicalAccess = id_LogicalAccess;
//    }

//    @Column(name = "project_id")
//    public int getProject_id() {
//        return project_id;
//    }
//
//    public void setProject_id(int project_id) {
//        this.project_id = project_id;
//    }


//    @OneToOne
//    @JoinColumn(name= "id_permissions", nullable=false)
//    @JsonIgnore
//    public Permissions getPermissions() {
//        return permission;
//    }
//
//    public void setPermissions(Permissions permissions) {
//        this.permission = permissions;
//    }

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

//    @Column(name = "access_id")
//    public int getAccess_id() {
//        return access_id;
//    }
//
//    public void setAccess_id(int access_id) {
//        this.access_id = access_id;
//    }

    @Basic
    @Column(name = "start_date")
    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    @Basic
    @Column(name = "end_date")
    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    @Basic
    @Column(name = "is_temporary")
    public boolean isTemporary() {
        return isTemporary;
    }

    public void setTemporary(boolean temporary) {
        isTemporary = temporary;
    }

//    @ManyToOne(optional=false)
//    @JoinColumn(name="id",referencedColumnName="id_LogicalAccess")
//    public Access getAccess() {
//        return access;
//    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PermissionsForProject that = (PermissionsForProject) o;

        if (id != that.id) return false;
        if (isTemporary != that.isTemporary) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (isTemporary ? 1 : 0);
        return result;
    }

    @OneToOne
    @JoinColumn(name = "id_LogicalAccess", insertable = false, updatable = false)
    @JsonIgnore
    public Access getAccess() {
        return access;
    }

    public void setAccess(Access access) {
        this.access = access;
    }


    @OneToMany(fetch = FetchType.EAGER, mappedBy = "permissionsForProject")
    @JsonIgnore
    public Set<ControlState> getControlStates() {
        return controlStates;
    }

    public void setControlStates(Set<ControlState> controlStates) {
        this.controlStates = controlStates;
    }
}