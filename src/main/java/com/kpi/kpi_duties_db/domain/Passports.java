package com.kpi.kpi_duties_db.domain;

import org.codehaus.jackson.annotate.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Created by Yaroslav on 31.10.2016.
 */
@Entity
@Table(name = "Passports", schema = "dbo", catalog = "[kpi_dev-1k_temp]")
public class Passports {
    private int idPassport;
    private boolean active;
    private String name;
    private String surname;
    private String patronymic;
    private String series;
    private String number;
    private String giveOut;
    private Timestamp giveOutData;
    private String placeOfRegistration;
    private Integer idCitizenship;
    private String orderNumber;
    private Timestamp orderData;
    private int idEmployeeOwner;
    private Employees2 employee;

    @Id
    @Column(name = "ID_Passport")
    public int getIdPassport() {
        return idPassport;
    }


    @Column(name ="ID_Employee_Owner")
    public int getIdEmployeeOwner() {
        return idEmployeeOwner;
    }

    public void setIdEmployeeOwner(int idEmployeeOwner) {
        this.idEmployeeOwner = idEmployeeOwner;
    }


    public void setIdPassport(int idPassport) {
        this.idPassport = idPassport;
    }

    @Basic
    @Column(name = "Active")
    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @Basic
    @Column(name = "Name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "Surname")
    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    @Basic
    @Column(name = "Patronymic")
    public String getPatronymic() {
        return patronymic;
    }

    public void setPatronymic(String patronymic) {
        this.patronymic = patronymic;
    }

    @Basic
    @Column(name = "Series")
    public String getSeries() {
        return series;
    }

    public void setSeries(String series) {
        this.series = series;
    }

    @Basic
    @Column(name = "Number")
    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    @Basic
    @Column(name = "GiveOut")
    public String getGiveOut() {
        return giveOut;
    }

    public void setGiveOut(String giveOut) {
        this.giveOut = giveOut;
    }

    @Basic
    @Column(name = "GiveOutData")
    public Timestamp getGiveOutData() {
        return giveOutData;
    }

    public void setGiveOutData(Timestamp giveOutData) {
        this.giveOutData = giveOutData;
    }

    @Basic
    @Column(name = "PlaceOfRegistration")
    public String getPlaceOfRegistration() {
        return placeOfRegistration;
    }

    public void setPlaceOfRegistration(String placeOfRegistration) {
        this.placeOfRegistration = placeOfRegistration;
    }

    @Basic
    @Column(name = "ID_Citizenship")
    public Integer getIdCitizenship() {
        return idCitizenship;
    }

    public void setIdCitizenship(Integer idCitizenship) {
        this.idCitizenship = idCitizenship;
    }

    @Basic
    @Column(name = "OrderNumber")
    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    @Basic
    @Column(name = "OrderData")
    public Timestamp getOrderData() {
        return orderData;
    }

    public void setOrderData(Timestamp orderData) {
        this.orderData = orderData;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Passports passports = (Passports) o;

        if (idPassport != passports.idPassport) return false;
        if (active != passports.active) return false;
        if (name != null ? !name.equals(passports.name) : passports.name != null) return false;
        if (surname != null ? !surname.equals(passports.surname) : passports.surname != null) return false;
        if (patronymic != null ? !patronymic.equals(passports.patronymic) : passports.patronymic != null) return false;
        if (series != null ? !series.equals(passports.series) : passports.series != null) return false;
        if (number != null ? !number.equals(passports.number) : passports.number != null) return false;
        if (giveOut != null ? !giveOut.equals(passports.giveOut) : passports.giveOut != null) return false;
        if (giveOutData != null ? !giveOutData.equals(passports.giveOutData) : passports.giveOutData != null)
            return false;
        if (placeOfRegistration != null ? !placeOfRegistration.equals(passports.placeOfRegistration) : passports.placeOfRegistration != null)
            return false;
        if (idCitizenship != null ? !idCitizenship.equals(passports.idCitizenship) : passports.idCitizenship != null)
            return false;
        if (orderNumber != null ? !orderNumber.equals(passports.orderNumber) : passports.orderNumber != null)
            return false;
        if (orderData != null ? !orderData.equals(passports.orderData) : passports.orderData != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idPassport;
        result = 31 * result + (active ? 1 : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (surname != null ? surname.hashCode() : 0);
        result = 31 * result + (patronymic != null ? patronymic.hashCode() : 0);
        result = 31 * result + (series != null ? series.hashCode() : 0);
        result = 31 * result + (number != null ? number.hashCode() : 0);
        result = 31 * result + (giveOut != null ? giveOut.hashCode() : 0);
        result = 31 * result + (giveOutData != null ? giveOutData.hashCode() : 0);
        result = 31 * result + (placeOfRegistration != null ? placeOfRegistration.hashCode() : 0);
        result = 31 * result + (idCitizenship != null ? idCitizenship.hashCode() : 0);
        result = 31 * result + (orderNumber != null ? orderNumber.hashCode() : 0);
        result = 31 * result + (orderData != null ? orderData.hashCode() : 0);
        return result;
    }


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_Employee_Owner", insertable = false, updatable = false)
    @JsonIgnore
    public Employees2 getEmployee() {
        return employee;
    }

    public void setEmployee(Employees2 employees2) {
        this.employee = employees2;
    }
}
