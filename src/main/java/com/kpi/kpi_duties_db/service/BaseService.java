package com.kpi.kpi_duties_db.service;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

public interface BaseService<T> {

    T add(T entity);
    List<T> add(List<T> entity);
    void delete(Integer id);
    T edit(T entity);
    List<T> getAll();
}
