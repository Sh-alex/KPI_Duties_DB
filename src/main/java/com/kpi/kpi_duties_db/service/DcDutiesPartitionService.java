package com.kpi.kpi_duties_db.service;

import com.kpi.kpi_duties_db.domain.dcduties.DcDutiesPartitionEntity;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 24.08.2016
 */

public interface DcDutiesPartitionService extends BaseService<DcDutiesPartitionEntity> {

    List<DcDutiesPartitionEntity> findByParams(String name, String sortDirection, Integer offset, Integer limit);
}
