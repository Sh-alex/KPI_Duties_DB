package com.kpi.kpi_duties_db.service.utils.usingoccupations;

import com.kpi.kpi_duties_db.shared.response.IdNameListResponse;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 07.11.2016
 */

public interface UsingOccupations {

    // nameCode - ім'я поля з id кода в RtCode, наприклад "codeETKDId"
    IdNameListResponse findUsingOccupationsIdForCode(IdNameListResponse response, String nameParentId);

    IdNameListResponse findUsingOccupationsIdForRtDutiesMustKnow(IdNameListResponse response);

    IdNameListResponse findUsingOccupationsIdForRtDutiesQualificationRequirements(IdNameListResponse response);

    IdNameListResponse findUsingOccupationsIdForRtDutiesTaskAndResponsibilities(IdNameListResponse response);

    IdNameListResponse findUsingOccupationsIdForDcDutiesName(IdNameListResponse response);

    IdNameListResponse findUsingOccupationsIdForDcDutiesPartition(IdNameListResponse response);

}
