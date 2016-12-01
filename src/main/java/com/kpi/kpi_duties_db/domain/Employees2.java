package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Arrays;

/**
 * Created by Yaroslav on 31.10.2016.
 */
@Entity
public class Employees2 {
    private int idEmployee;
    private Integer idNationality;
    private String identificationCode;
    private String birthPlace;
    private Timestamp infillData;
    private Timestamp changeDate;
    private Integer idCountry;
    private byte[] photo;
    private Permissions permissions;
    private Passports passports;

    @Id
    @Column(name = "ID_employee")
    public int getIdEmployee() {
        return idEmployee;
    }

    public void setIdEmployee(int idEmployee) {
        this.idEmployee = idEmployee;
    }

    @Basic
    @Column(name = "ID_Nationality")
    public Integer getIdNationality() {
        return idNationality;
    }

    public void setIdNationality(Integer idNationality) {
        this.idNationality = idNationality;
    }

    @Basic
    @Column(name = "IdentificationCode")
    public String getIdentificationCode() {
        return identificationCode;
    }

    public void setIdentificationCode(String identificationCode) {
        this.identificationCode = identificationCode;
    }

    @Basic
    @Column(name = "BirthPlace")
    public String getBirthPlace() {
        return birthPlace;
    }

    public void setBirthPlace(String birthPlace) {
        this.birthPlace = birthPlace;
    }

    @Basic
    @Column(name = "InfillData")
    public Timestamp getInfillData() {
        return infillData;
    }

    public void setInfillData(Timestamp infillData) {
        this.infillData = infillData;
    }

    @Basic
    @Column(name = "_ChangeDate")
    public Timestamp getChangeDate() {
        return changeDate;
    }

    public void setChangeDate(Timestamp changeDate) {
        this.changeDate = changeDate;
    }

    @Basic
    @Column(name = "ID_Country")
    public Integer getIdCountry() {
        return idCountry;
    }

    public void setIdCountry(Integer idCountry) {
        this.idCountry = idCountry;
    }

    @Basic
    @Column(name = "Photo")
    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Employees2 that = (Employees2) o;

        if (idEmployee != that.idEmployee) return false;
        if (idNationality != null ? !idNationality.equals(that.idNationality) : that.idNationality != null)
            return false;
        if (identificationCode != null ? !identificationCode.equals(that.identificationCode) : that.identificationCode != null)
            return false;
        if (birthPlace != null ? !birthPlace.equals(that.birthPlace) : that.birthPlace != null) return false;
        if (infillData != null ? !infillData.equals(that.infillData) : that.infillData != null) return false;
        if (changeDate != null ? !changeDate.equals(that.changeDate) : that.changeDate != null) return false;
        if (idCountry != null ? !idCountry.equals(that.idCountry) : that.idCountry != null) return false;
        if (!Arrays.equals(photo, that.photo)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idEmployee;
        result = 31 * result + (idNationality != null ? idNationality.hashCode() : 0);
        result = 31 * result + (identificationCode != null ? identificationCode.hashCode() : 0);
        result = 31 * result + (birthPlace != null ? birthPlace.hashCode() : 0);
        result = 31 * result + (infillData != null ? infillData.hashCode() : 0);
        result = 31 * result + (changeDate != null ? changeDate.hashCode() : 0);
        result = 31 * result + (idCountry != null ? idCountry.hashCode() : 0);
        result = 31 * result + Arrays.hashCode(photo);
        return result;
    }

    @OneToOne(mappedBy = "employees2")
    public Permissions getPermissions() {
        return permissions;
    }

    public void setPermissions(Permissions permissions) {
        this.permissions = permissions;
    }

    @OneToOne(mappedBy = "employee")
    public Passports getPassports() {
        return passports;
    }

    public void setPassports(Passports passports) {
        this.passports = passports;
    }
}
