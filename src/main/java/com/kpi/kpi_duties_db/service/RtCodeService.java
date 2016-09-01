package com.kpi.kpi_duties_db.service;

import com.kpi.kpi_duties_db.domain.RtCodeEntity;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 01.09.2016
 */

public interface RtCodeService extends BaseService<RtCodeEntity> {

    List<RtCodeEntity> add(List<RtCodeEntity> entities);
}
