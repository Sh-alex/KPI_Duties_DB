package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "DcDuties_TasksAndResponsibilities", schema = "dbo", catalog = "DcDuties")
public class DcDutiesTasksAndResponsibilitiesEntity {
    private int id;
    private String text;

    private Set<RtDutiesTaskAndResponsibilitiesEntity> rtDutiesTaskAndResponsibilitiesEntities = new HashSet<>();

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

    @OneToMany(mappedBy = "dcDutiesTasksAndResponsibilitiesEntity", fetch = FetchType.LAZY)
    public Set<RtDutiesTaskAndResponsibilitiesEntity> getRtDutiesTaskAndResponsibilitiesEntities() {
        return rtDutiesTaskAndResponsibilitiesEntities;
    }

    public void setRtDutiesTaskAndResponsibilitiesEntities(Set<RtDutiesTaskAndResponsibilitiesEntity> rtDutiesTaskAndResponsibilitiesEntities) {
        this.rtDutiesTaskAndResponsibilitiesEntities = rtDutiesTaskAndResponsibilitiesEntities;
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
