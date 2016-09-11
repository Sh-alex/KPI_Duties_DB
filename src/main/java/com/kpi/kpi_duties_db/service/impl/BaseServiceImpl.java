package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.service.BaseService;
import com.kpi.kpi_duties_db.shared.message.error.CreateEntityException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 01.09.2016
 */

@Transactional(propagation= Propagation.REQUIRED)
public abstract class BaseServiceImpl<T> implements BaseService<T> {

    @Autowired
    JpaRepository<T, Integer> repository;

    private final static Logger logger = LoggerFactory.getLogger(BaseServiceImpl.class);

    @Override
    @Transactional
    public T add(T entity) {
        T savedEntity = null;
        try {
            savedEntity = repository.saveAndFlush(entity);
        } catch (Exception e) {
            String msg = "Entity " + entity.getClass().getSimpleName() + " not created, check the data";
            logger.error(msg);
            throw new CreateEntityException(msg);
        }
        return savedEntity;
    }

    @Override
    @Transactional
    public List<T> add(List<T> entities) {

        List<T> list = null;
        try {
            list = repository.save(entities);
        } catch (Exception e) {
            String msg = "Entity " + entities.getClass().getSimpleName() + " not created, check the data";
            logger.error(msg);
            throw new CreateEntityException(msg);
        }
        repository.flush();

        return list;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        repository.delete(id);
    }

    @Override
    @Transactional
    public T edit(T entity) {
        return repository.saveAndFlush(entity);
    }

    @Override
    @Transactional
    public List<T> edit(List<T> entities) {
        List<T> list = repository.save(entities);
        repository.flush();

        return list;
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> getAll() {
        return repository.findAll();
    }
}