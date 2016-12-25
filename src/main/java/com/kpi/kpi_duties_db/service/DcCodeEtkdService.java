package com.kpi.kpi_duties_db.service;

import com.kpi.kpi_duties_db.domain.dcduties.DcCodeEtkdEntity;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 25.08.2016
 */

public interface DcCodeEtkdService extends BaseService<DcCodeEtkdEntity> {

    DcCodeEtkdEntity findByName(String name);

    List<DcCodeEtkdEntity> findByParams(String name, String sortDirection, Integer offset, Integer limit);
}
