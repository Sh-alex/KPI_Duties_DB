package com.kpi.kpi_duties_db.service;

import com.kpi.kpi_duties_db.domain.dcduties.DcCodeDkhpEntity;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 25.08.2016
 */

public interface DcCodeDkhpService extends BaseService<DcCodeDkhpEntity> {

    DcCodeDkhpEntity findByName(String name);

    List<DcCodeDkhpEntity> findByParams(String name, String sortDirection, Integer offset, Integer limit);
}
