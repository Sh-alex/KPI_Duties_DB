package com.kpi.kpi_duties_db.domain;




import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Yaroslav on 01.12.2016.
 */
@Entity
public class FormState {
    private int id;
    private boolean isTemporary;
    private Date startDate;
    private Form form;
    private VisualState visualState;

    @OneToOne
    @JoinColumn(name = "VisualStateId", insertable = false, updatable = false)
    @JsonIgnore
    public VisualState getVisualState() {
        return visualState;
    }

    public void setVisualState(VisualState visualState) {
        this.visualState = visualState;
    }

    private Date endDate;
//    @OneToOne(fetch = FetchType.EAGER)
    @OneToOne
    @JoinColumn(name = "FormId", insertable = false, updatable = false)
    @JsonIgnore
    public Form getForm() {
        return form;
    }

    public void setForm(Form form) {
        this.form = form;
    }

    //
    private PermissionsForProject permissionsForProject;



    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_permissionsForProjects", insertable = false, updatable = false)
    @JsonIgnore
    public PermissionsForProject getPermissionsForProject() {
        return permissionsForProject;
    }

    public void setPermissionsForProject(PermissionsForProject permissionsForProject) {
        this.permissionsForProject = permissionsForProject;
    }


    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    @Basic
    @Column(name = "is_temporary")
    public boolean isTemporary() {
        return isTemporary;
    }

    public void setTemporary(boolean temporary) {
        isTemporary = temporary;
    }

    public void setId(int id) {
        this.id = id;
    }

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        FormState formState = (FormState) o;

        if (id != formState.id) return false;
        if (isTemporary != formState.isTemporary) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (isTemporary ? 1 : 0);
        return result;
    }
}
