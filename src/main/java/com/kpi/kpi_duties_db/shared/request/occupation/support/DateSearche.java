package com.kpi.kpi_duties_db.shared.request.occupation.support;

import org.joda.time.DateTime;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 04.09.2016
 */

public class DateSearche {

    private Boolean takeIntoAccount;

    private DateTime from;

    private DateTime to;

    public Boolean getTakeIntoAccount() {
        return takeIntoAccount;
    }

    public void setTakeIntoAccount(Boolean takeIntoAccount) {
        this.takeIntoAccount = takeIntoAccount;
    }

    public DateTime getFrom() {
        return from;
    }

    public void setFrom(DateTime from) {
        this.from = from;
    }

    public DateTime getTo() {
        return to;
    }

    public void setTo(DateTime to) {
        this.to = to;
    }
}
