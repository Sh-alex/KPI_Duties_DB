package com.kpi.kpi_duties_db.shared.message.error;


import com.kpi.kpi_duties_db.shared.message.utils.MainServerWebException;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 11.09.2016
 * <p>
 * Null status exception
 */
public class NullRequestDataException extends MainServerWebException {

    public NullRequestDataException() {
        super(400, "Bad request", "Request data is empty. Please correct");
    }

    public NullRequestDataException(String msg) {
        super(400, msg, msg);
    }
}