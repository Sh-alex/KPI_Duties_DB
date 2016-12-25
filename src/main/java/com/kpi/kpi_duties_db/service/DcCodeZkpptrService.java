package com.kpi.kpi_duties_db.service;

import com.kpi.kpi_duties_db.domain.dcduties.DcCodeZkpptrEntity;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 25.08.2016
 */

public interface DcCodeZkpptrService extends BaseService<DcCodeZkpptrEntity> {

    DcCodeZkpptrEntity findByName(String name);

    List<DcCodeZkpptrEntity> findByParams(String name, String sortDirection, Integer offset, Integer limit);
}
