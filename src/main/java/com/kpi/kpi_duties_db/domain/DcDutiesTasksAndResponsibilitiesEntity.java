package com.kpi.kpi_duties_db.domain;

import javax.persistence.*;
import java.util.Set;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Entity
@Table(name = "DcDuties_TasksAndResponsibilities", schema = "dbo", catalog = "DcDuties")
public class DcDutiesTasksAndResponsibilitiesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;

    @Column(name = "Text")
    private String text;

    @OneToMany(fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "DcDuties_TasksAndResponsibilitiesId")
    private Set<RtDutiesTaskAndResponsibilitiesEntity> rtDutiesTaskAndResponsibilitiesEntities;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }


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
