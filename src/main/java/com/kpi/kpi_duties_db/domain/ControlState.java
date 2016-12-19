package com.kpi.kpi_duties_db.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Yaroslav on 01.12.2016.
 */
@Entity
public class ControlState {
    private int stateId;
    private boolean isTemporary;
    private Date startDate;
    private Date endDate;
    private Control control;
    private VisualState visualState;



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


    @OneToOne
    @JoinColumn(name = "ControlId", insertable = false, updatable = false)
    @JsonIgnore
    public Control getControl() {
        return control;
    }

    public void setControl(Control control) {
        this.control = control;
    }

    @OneToOne
    @JoinColumn(name = "VisualStateId", insertable = false, updatable = false)
    @JsonIgnore
    public VisualState getVisualState() {
        return visualState;
    }

    public void setVisualState(VisualState visualState) {
        this.visualState = visualState;
    }

    @Id
    @Column(name = "StateId")
    public int getStateId() {
        return stateId;
    }



    public void setStateId(int stateId) {
        this.stateId = stateId;
    }

    @Basic
    @Column(name = "is_temporary")
    public boolean isTemporary() {
        return isTemporary;
    }

    public void setTemporary(boolean temporary) {
        isTemporary = temporary;
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

        ControlState that = (ControlState) o;

        if (stateId != that.stateId) return false;
        if (isTemporary != that.isTemporary) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = stateId;
        result = 31 * result + (isTemporary ? 1 : 0);
        return result;
    }
}
