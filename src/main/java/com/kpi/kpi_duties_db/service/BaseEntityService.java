package com.kpi.kpi_duties_db.service;

import java.util.List;

public interface BaseEntityService<T> {

    T add(T entity);
    void delete(int id);
    T edit(T entity);
    List<T> getAll();
}
