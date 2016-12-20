package com.kpi.kpi_duties_db.domain.dcduties;

import javax.persistence.*;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DcDutiesTasksAndResponsibilitiesEntity)) return false;
        DcDutiesTasksAndResponsibilitiesEntity that = (DcDutiesTasksAndResponsibilitiesEntity) o;
        return getId() == that.getId() &&
                Objects.equals(getText(), that.getText());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getText());
    }
}
