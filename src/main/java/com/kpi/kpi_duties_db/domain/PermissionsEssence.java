package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Yaroslav on 01.12.2016.
 */
@Entity
@Table(name = "Permissions_Essence", schema = "dbo", catalog = "Permissions_zhenya")
public class PermissionsEssence {
    private int id;
    private boolean isTemporary;

    private Date startDate;
    private Date endDate;

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



    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "is_temporary")
    public boolean isTemporary() {
        return isTemporary;
    }

    public void setTemporary(boolean temporary) {
        isTemporary = temporary;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PermissionsEssence that = (PermissionsEssence) o;

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
}
