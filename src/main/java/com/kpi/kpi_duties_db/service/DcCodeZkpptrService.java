package com.kpi.kpi_duties_db.service;

import com.kpi.kpi_duties_db.domain.DcCodeZkpptrEntity;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 25.08.2016
 */

public interface DcCodeZkpptrService extends BaseService<DcCodeZkpptrEntity> {

    DcCodeZkpptrEntity findByName(String name);
}
