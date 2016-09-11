package com.kpi.kpi_duties_db.shared.message.error;


import com.kpi.kpi_duties_db.shared.message.utils.MainServerWebException;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 11.09.2016
 */
public class DuplicateException extends MainServerWebException {

    public DuplicateException() {
        super(400, "Duplicate name exception.", "Duplicate name exception.");
    }

    public DuplicateException(String msg) {
        super(400, msg, msg);
    }
}
