package com.kpi.kpi_duties_db.shared.message.error;


import com.kpi.kpi_duties_db.shared.message.utils.MainServerWebException;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 11.09.2016
 * <p>
 * Entity not found exception
 */
public class NotFoundEntityException extends MainServerWebException {

    public NotFoundEntityException() {
        super(400, "Object not found exception.", "Object not found");
    }

    public NotFoundEntityException(String serverMessage) {
        super(400, serverMessage, "Object not found");
    }
}
