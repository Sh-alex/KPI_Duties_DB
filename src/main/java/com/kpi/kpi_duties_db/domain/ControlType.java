package com.kpi.kpi_duties_db.domain;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by Yaroslav on 01.12.2016.
 */
@Entity
public class ControlType {
    private int controlTypeId;
    private String controlTypeName;

    @Id
    @Column(name = "ControlTypeId")
    public int getControlTypeId() {
        return controlTypeId;
    }

    public void setControlTypeId(int controlTypeId) {
        this.controlTypeId = controlTypeId;
    }

    @Basic
    @Column(name = "ControlTypeName")
    public String getControlTypeName() {
        return controlTypeName;
    }

    public void setControlTypeName(String controlTypeName) {
        this.controlTypeName = controlTypeName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ControlType that = (ControlType) o;

        if (controlTypeId != that.controlTypeId) return false;
        if (controlTypeName != null ? !controlTypeName.equals(that.controlTypeName) : that.controlTypeName != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = controlTypeId;
        result = 31 * result + (controlTypeName != null ? controlTypeName.hashCode() : 0);
        return result;
    }
}
