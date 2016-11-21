package com.kpi.kpi_duties_db.shared.message.error;


import com.kpi.kpi_duties_db.shared.message.utils.MainServerWebException;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 11.09.2016
 * <p>
 * Update entity exception
 */
public class UpdateEntityException extends MainServerWebException {

    public UpdateEntityException() {
        super(400, "Update entity exception.", "");
    }

    public UpdateEntityException(String msg) {
        super(400, msg, msg);
    }
}
