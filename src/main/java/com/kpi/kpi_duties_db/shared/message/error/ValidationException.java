package com.kpi.kpi_duties_db.shared.message.error;


import com.kpi.kpi_duties_db.shared.message.utils.MainServerWebException;

import javax.validation.ConstraintViolation;
import java.util.Set;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 11.09.2016
 * <p>
 * Validation exception
 */
public class ValidationException extends MainServerWebException {
    public ValidationException(Set<? extends ConstraintViolation<?>> constraintViolations) {
        super(400, "Validation Error", "The data passed in the status was invalid. Please check and resubmit");
        setErrors(constraintViolations);
    }

    public ValidationException(String message) {
        super(400, "Validation Error", message);
    }

}
