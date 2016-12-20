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
    void delete(List<T> entity);
    T update(T entity);
    List<T> update(List<T> entity);
    T getById(Integer id);
    List<T> getAll();
    List<T> getAll(Integer offset, Integer limit);
}
