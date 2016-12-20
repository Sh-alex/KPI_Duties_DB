package com.kpi.kpi_duties_db.service.parser;

import com.kpi.kpi_duties_db.service.parser.support.OccupationFromXls;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 04.12.2016
 */

public interface ParserXls {

    List<OccupationFromXls> parseXlsToOccupations();

    void saveOccupationsToDB(List<OccupationFromXls> occupationsFromXls);
}
