package com.kpi.kpi_duties_db.service;

import com.kpi.kpi_duties_db.domain.dcduties.DcDutiesNameEntity;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

public interface DcDutiesNameService extends BaseService<DcDutiesNameEntity> {

    DcDutiesNameEntity findByName(String name);

}
