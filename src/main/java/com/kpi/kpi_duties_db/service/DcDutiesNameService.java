package com.kpi.kpi_duties_db.service;

import com.kpi.kpi_duties_db.domain.DcDutiesNameEntity;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

public interface DcDutiesNameService extends BaseService<DcDutiesNameEntity> {

    DcDutiesNameEntity getById(Integer id);

}
