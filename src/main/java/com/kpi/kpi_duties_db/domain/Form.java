package com.kpi.kpi_duties_db.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.persistence.criteria.JoinType;
import java.util.List;
import java.util.Set;

/**
 * Created by Yaroslav on 01.12.2016.
 */
@Entity
public class Form {
    private int id;
    private FormState formState;
    private Set<Control> controlList;


    private String name;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "form")
    @JsonIgnore
    public Set<Control> getControlList() {
        return controlList;
    }

    public void setControlList(Set<Control> controlList) {
        this.controlList = controlList;
    }

    @OneToOne(mappedBy = "form")
    @JsonIgnore
    public FormState getFormState() {
        return formState;
    }

    public void setFormState(FormState formState) {
        this.formState = formState;
    }

    @Id
    @Column(name = "Id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "Name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Form form = (Form) o;

        if (id != form.id) return false;
        if (name != null ? !name.equals(form.name) : form.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }
}
