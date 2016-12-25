package com.kpi.kpi_duties_db.service;

import com.kpi.kpi_duties_db.domain.dcduties.DcCodeKpEntity;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 25.08.2016
 */

public interface DcCodeKpService extends BaseService<DcCodeKpEntity> {

    DcCodeKpEntity findByName(String name);

    List<DcCodeKpEntity> findByParams(String name, String sortDirection, Integer offset, Integer limit);
}
