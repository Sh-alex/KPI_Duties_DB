package com.kpi.kpi_duties_db.service;

import com.kpi.kpi_duties_db.domain.DutiesValidityDateEntity;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 01.09.2016
 */

public interface DutiesValidityDateService extends BaseService<DutiesValidityDateEntity> {

    List<DutiesValidityDateEntity> add(List<DutiesValidityDateEntity> entities);
}
