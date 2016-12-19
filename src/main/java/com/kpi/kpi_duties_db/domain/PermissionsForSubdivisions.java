package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;

/**
 * Created by Yaroslav on 01.12.2016.
 */
@Entity
@Table(name = "Permissions_For_Subdivisions", schema = "dbo", catalog = "Permissions_zhenya")
public class PermissionsForSubdivisions {
    private int id;
    private int idSubdivision;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "id_subdivision")
    public int getIdSubdivision() {
        return idSubdivision;
    }

    public void setIdSubdivision(int idSubdivision) {
        this.idSubdivision = idSubdivision;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PermissionsForSubdivisions that = (PermissionsForSubdivisions) o;

        if (id != that.id) return false;
        if (idSubdivision != that.idSubdivision) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + idSubdivision;
        return result;
    }
}
