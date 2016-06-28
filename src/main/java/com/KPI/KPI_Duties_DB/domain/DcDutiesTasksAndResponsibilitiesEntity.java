package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;

@Entity
@Table(name = "DcDuties_TasksAndResponsibilities", schema = "dbo", catalog = "DcDuties")
public class DcDutiesTasksAndResponsibilitiesEntity {
    private int id;
    private String text;

    @Id
    @Column(name = "Id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "Text")
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DcDutiesTasksAndResponsibilitiesEntity that = (DcDutiesTasksAndResponsibilitiesEntity) o;

        if (id != that.id) return false;
        if (text != null ? !text.equals(that.text) : that.text != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (text != null ? text.hashCode() : 0);
        return result;
    }
}
