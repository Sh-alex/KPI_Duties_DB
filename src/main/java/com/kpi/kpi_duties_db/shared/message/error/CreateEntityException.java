package com.kpi.kpi_duties_db.shared.message.error;


import com.kpi.kpi_duties_db.shared.message.utils.MainServerWebException;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 11.09.2016
 * <p>
 * Create entity exception
 */
public class CreateEntityException extends MainServerWebException {

    public CreateEntityException() {
        super(400, "Create entity exception.", "");
    }

    public CreateEntityException(String msg) {
        super(400, msg, msg);
    }
}
