package com.kpi.kpi_duties_db.service;

import com.kpi.kpi_duties_db.domain.dcduties.DcDutiesMustKnowEntity;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 27.08.2016
 */

public interface DcDutiesMustKnowService extends BaseService<DcDutiesMustKnowEntity> {

    List<DcDutiesMustKnowEntity> findByParams(String text, String sortDirection, Integer offset, Integer limit);
}
