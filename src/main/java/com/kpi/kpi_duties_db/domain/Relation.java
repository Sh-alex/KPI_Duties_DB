package com.kpi.kpi_duties_db.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by Yaroslav on 01.12.2016.
 */
@Entity
public class Relation {
    private int relationId;

    @Id
    @Column(name = "RelationId")
    public int getRelationId() {
        return relationId;
    }

    public void setRelationId(int relationId) {
        this.relationId = relationId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Relation relation = (Relation) o;

        if (relationId != relation.relationId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return relationId;
    }
}
