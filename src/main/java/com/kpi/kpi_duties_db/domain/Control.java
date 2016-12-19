package com.kpi.kpi_duties_db.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * Created by Yaroslav on 01.12.2016.
 */
@Entity
public class Control {
    private int controlId;
    private String controlName;
    private ControlState controlState;
    private Form form;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "FormId", insertable = false, updatable = false)
    @JsonIgnore
    public Form getForm() {
        return form;
    }

    public void setForm(Form form) {
        this.form = form;
    }



    @Id
    @Column(name = "ControlId")
    public int getControlId() {
        return controlId;
    }

    public void setControlId(int controlId) {
        this.controlId = controlId;
    }

    @Basic
    @Column(name = "ControlName")
    public String getControlName() {
        return controlName;
    }

    public void setControlName(String controlName) {
        this.controlName = controlName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Control control = (Control) o;

        if (controlId != control.controlId) return false;
        if (controlName != null ? !controlName.equals(control.controlName) : control.controlName != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = controlId;
        result = 31 * result + (controlName != null ? controlName.hashCode() : 0);
        return result;
    }

    @OneToOne(mappedBy = "control")
    @JsonIgnore
    public ControlState getControlState() {
        return controlState;
    }

    public void setControlState(ControlState controlState) {
        this.controlState = controlState;
    }
}
