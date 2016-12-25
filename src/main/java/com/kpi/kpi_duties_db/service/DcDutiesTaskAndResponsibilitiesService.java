package com.kpi.kpi_duties_db.service;

import com.kpi.kpi_duties_db.domain.dcduties.DcDutiesTasksAndResponsibilitiesEntity;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 25.08.2016
 */

public interface DcDutiesTaskAndResponsibilitiesService extends BaseService<DcDutiesTasksAndResponsibilitiesEntity> {

    List<DcDutiesTasksAndResponsibilitiesEntity> findByParams(String text, String sortDirection, Integer offset, Integer limit);
}
