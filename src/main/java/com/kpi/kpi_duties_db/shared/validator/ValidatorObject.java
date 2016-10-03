package com.kpi.kpi_duties_db.shared.validator;

import com.kpi.kpi_duties_db.shared.message.error.ValidationException;
import org.slf4j.Logger;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.Set;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 11.09.2016
 */

public class ValidatorObject {

    public static void validate(Object request, Logger logger, Validator validator) {
        Set<? extends ConstraintViolation<?>> constraintViolations = validator.validate(request);
        if (constraintViolations.size() > 0) {
            logger.error("Validation error:" + constraintViolations.toString());
            throw new ValidationException(constraintViolations);
        }
    }
}