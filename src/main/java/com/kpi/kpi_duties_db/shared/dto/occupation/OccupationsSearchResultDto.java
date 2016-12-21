package com.kpi.kpi_duties_db.shared.dto.occupation;

import com.kpi.kpi_duties_db.domain.dcduties.RtDutiesEntity;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 21.12.2016
 */

public class OccupationsSearchResultDto {

    private Integer resultSize;

    private List<RtDutiesEntity> entities;

    public Integer getResultSize() {
        return resultSize;
    }

    public void setResultSize(Integer resultSize) {
        this.resultSize = resultSize;
    }

    public List<RtDutiesEntity> getEntities() {
        return entities;
    }

    public void setEntities(List<RtDutiesEntity> entities) {
        this.entities = entities;
    }
}
