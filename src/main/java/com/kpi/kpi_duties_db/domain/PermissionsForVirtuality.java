package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;

/**
 * Created by Yaroslav on 01.12.2016.
 */
@Entity
@Table(name = "Permissions_For_Virtuality", schema = "dbo", catalog = "Permissions_zhenya")
public class PermissionsForVirtuality {
    private int id;
    private boolean doplata;
    private boolean nadbavka;
    private boolean navantazhennya;
    private String description;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "doplata")
    public boolean isDoplata() {
        return doplata;
    }

    public void setDoplata(boolean doplata) {
        this.doplata = doplata;
    }

    @Basic
    @Column(name = "nadbavka")
    public boolean isNadbavka() {
        return nadbavka;
    }

    public void setNadbavka(boolean nadbavka) {
        this.nadbavka = nadbavka;
    }

    @Basic
    @Column(name = "navantazhennya")
    public boolean isNavantazhennya() {
        return navantazhennya;
    }

    public void setNavantazhennya(boolean navantazhennya) {
        this.navantazhennya = navantazhennya;
    }

    @Basic
    @Column(name = "description")
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

        PermissionsForVirtuality that = (PermissionsForVirtuality) o;

        if (id != that.id) return false;
        if (doplata != that.doplata) return false;
        if (nadbavka != that.nadbavka) return false;
        if (navantazhennya != that.navantazhennya) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (doplata ? 1 : 0);
        result = 31 * result + (nadbavka ? 1 : 0);
        result = 31 * result + (navantazhennya ? 1 : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        return result;
    }
}
