package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;

/**
 * Created by Yaroslav on 01.12.2016.
 */
@Entity
@Table(name = "Permissions_For_WorkAddress", schema = "dbo", catalog = "Permissions_zhenya")
public class PermissionsForWorkAddress {
    private int id;
    private int idWorkAddress;
    private boolean permission;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "id_work_address")
    public int getIdWorkAddress() {
        return idWorkAddress;
    }

    public void setIdWorkAddress(int idWorkAddress) {
        this.idWorkAddress = idWorkAddress;
    }

    @Basic
    @Column(name = "permission")
    public boolean isPermission() {
        return permission;
    }

    public void setPermission(boolean permission) {
        this.permission = permission;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PermissionsForWorkAddress that = (PermissionsForWorkAddress) o;

        if (id != that.id) return false;
        if (idWorkAddress != that.idWorkAddress) return false;
        if (permission != that.permission) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + idWorkAddress;
        result = 31 * result + (permission ? 1 : 0);
        return result;
    }
}
