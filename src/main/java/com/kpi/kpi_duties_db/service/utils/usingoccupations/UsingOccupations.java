package com.kpi.kpi_duties_db.service.utils.usingoccupations;

import com.kpi.kpi_duties_db.shared.response.IdNameListResponse;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 07.11.2016
 */

public interface UsingOccupations {

    // nameCode - ім'я поля з id кода в RtCode, наприклад "codeETKDId"
    IdNameListResponse findUsingOccupationsIdForCode(IdNameListResponse response, String nameCode);

    IdNameListResponse findUsingOccupationsIdForDcDutiesMustKnow(IdNameListResponse response);

}
