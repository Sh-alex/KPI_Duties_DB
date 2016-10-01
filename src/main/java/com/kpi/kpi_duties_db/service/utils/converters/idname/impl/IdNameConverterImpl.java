package com.kpi.kpi_duties_db.service.utils.converters.idname.impl;

import com.kpi.kpi_duties_db.service.utils.converters.idname.IdNameConverter;
import com.kpi.kpi_duties_db.shared.message.error.ServerException;
import com.kpi.kpi_duties_db.shared.response.IdNameListResponse;
import com.kpi.kpi_duties_db.shared.response.support.IdNameResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 12.09.2016
 */

@Component
public class IdNameConverterImpl implements IdNameConverter {

    private final String GET_ID = "getIdText";
    private final String GET_NAME = "getName";

    private final static Logger logger = LoggerFactory.getLogger(IdNameConverterImpl.class);

    @Override
    public IdNameListResponse toIdNameListResponseFromEntityList(List<? extends Object> list) {
        IdNameListResponse response = new IdNameListResponse();

        response.setIdNameResponses(new ArrayList<>());
        List<IdNameResponse> idNameResponses = response.getIdNameResponses();

        for (Object object : list) {
            IdNameResponse idNameResponse = new IdNameResponse();
            try {
                Method method = object.getClass().getMethod(GET_ID);
                idNameResponse.setId((Integer)method.invoke(object));
                method = object.getClass().getMethod(GET_NAME);
                idNameResponse.setName((String) method.invoke(object));
            } catch (NoSuchMethodException e) {
                String msg = "No such method by name in object";
                logger.error(msg);
                throw new ServerException(msg);
            } catch (IllegalAccessException e) {
                String msg = "IllegalAccessException";
                logger.error(msg);
                throw new ServerException(msg);
            } catch (InvocationTargetException e) {
                String msg = "InvocationTargetException";
                logger.error(msg);
                throw new ServerException(msg);
            }

            idNameResponses.add(idNameResponse);
        }
        return  response;
    }
}
