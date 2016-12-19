package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;

/**
 * Created by Yaroslav on 01.12.2016.
 */
@Entity
public class VisualState {
    private int visualStateId;
    private boolean isVisible;
    private Boolean isReadOnly;
    private Boolean isRequired;
    private String description;
    private FormState formState;
    private ControlState controlState;

    @Id
    @Column(name = "VisualStateId")
    public int getVisualStateId() {
        return visualStateId;
    }

    public void setVisualStateId(int visualStateId) {
        this.visualStateId = visualStateId;
    }

    @Basic
    @Column(name = "IsVisible")
    public boolean isVisible() {
        return isVisible;
    }

    public void setVisible(boolean visible) {
        isVisible = visible;
    }

    @Basic
    @Column(name = "IsReadOnly")
    public Boolean getReadOnly() {
        return isReadOnly;
    }

    public void setReadOnly(Boolean readOnly) {
        isReadOnly = readOnly;
    }

    @Basic
    @Column(name = "IsRequired")
    public Boolean getRequired() {
        return isRequired;
    }

    public void setRequired(Boolean required) {
        isRequired = required;
    }

    @Basic
    @Column(name = "Description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VisualState that = (VisualState) o;

        if (visualStateId != that.visualStateId) return false;
        if (isVisible != that.isVisible) return false;
        if (isReadOnly != null ? !isReadOnly.equals(that.isReadOnly) : that.isReadOnly != null) return false;
        if (isRequired != null ? !isRequired.equals(that.isRequired) : that.isRequired != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = visualStateId;
        result = 31 * result + (isVisible ? 1 : 0);
        result = 31 * result + (isReadOnly != null ? isReadOnly.hashCode() : 0);
        result = 31 * result + (isRequired != null ? isRequired.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        return result;
    }

    @OneToOne(mappedBy = "visualState")
    public FormState getFormState() {
        return formState;
    }

    public void setFormState(FormState formState) {
        this.formState = formState;
    }

    @OneToOne(mappedBy = "visualState")
    public ControlState getControlState() {
        return controlState;
    }

    public void setControlState(ControlState controlState) {
        this.controlState = controlState;
    }
}
