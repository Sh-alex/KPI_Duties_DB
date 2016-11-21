package com.kpi.kpi_duties_db.shared.message.utils;

import javax.validation.ConstraintViolation;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 11.09.2016
 * <p>
 * Jersey web exception settings
 */
public class MainServerWebException extends WebApplicationException {

    private final int status;
    private final String errorMessage;
    private final String serverMessage;
    private final List<MessageProperty> errors = new ArrayList<MessageProperty>();

    public MainServerWebException(int httpStatus, String serverMessage, String errorMessage) {
        this.status = httpStatus;
        this.errorMessage = errorMessage;
        this.serverMessage = serverMessage;
    }

    public void setErrors(Set<? extends ConstraintViolation<?>> violations) {
        for (ConstraintViolation<?> constraintViolation : violations) {
            MessageProperty error = new MessageProperty();
            error.setMessage(constraintViolation.getMessage());
            error.setName(constraintViolation.getPropertyPath().toString());
            error.setValue(constraintViolation.getInvalidValue() != null ? constraintViolation.getInvalidValue().toString() : null);
            errors.add(error);
        }
    }

    @Override
    public Response getResponse() {
        return Response.status(status).type(MediaType.APPLICATION_JSON_TYPE).entity(getErrorResponse()).build();
    }

    @Override
    public String getMessage() {
        return errorMessage;
    }

    public MessageResponse getErrorResponse() {
        MessageResponse response = new MessageResponse();
        response.setCode(String.valueOf(status));
        response.setServerMessage(serverMessage);
        response.setClientMessage(errorMessage);
        response.setMessageProperties(errors);
        return response;
    }

}
