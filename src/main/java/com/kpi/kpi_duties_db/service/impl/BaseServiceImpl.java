package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 01.09.2016
 */

public abstract class BaseServiceImpl<T> implements BaseService<T> {

    @Autowired
    JpaRepository<T, Integer> repository;


    @Override
    public T add(T entity) {
        return repository.saveAndFlush(entity);
    }

    public List<T> add(List<T> entities) {
        List<T> list = new ArrayList<>();
        for (T entity : entities) {
            list.add(repository.saveAndFlush(entity));
        }
        return list;
    }

    @Override
    public void delete(Integer id) {
        repository.delete(id);
    }

    @Override
    public T edit(T entity) {
        return repository.saveAndFlush(entity);
    }

    @Override
    public List<T> getAll() {
        return repository.findAll();
    }
}
