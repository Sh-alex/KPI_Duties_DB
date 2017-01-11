package com.kpi.kpi_duties_db.service;

import com.kpi.kpi_duties_db.domain.dcduties.DcDutiesNameEntity;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

public interface DcDutiesNameService extends BaseService<DcDutiesNameEntity> {

    DcDutiesNameEntity findByName(String name);

    List<DcDutiesNameEntity> findByParams(String name, String sortDirection, Integer offset, Integer limit);
}
