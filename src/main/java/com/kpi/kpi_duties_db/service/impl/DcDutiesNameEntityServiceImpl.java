package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.DcDutiesNameEntity;
import com.kpi.kpi_duties_db.repository.DcDutiesNameEntityRepository;
import com.kpi.kpi_duties_db.service.DcDutiesNameEntityService;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Service
public class DcDutiesNameEntityServiceImpl implements DcDutiesNameEntityService {

    @Autowired
    private
    DcDutiesNameEntityRepository dcDutiesNameEntityRepository;

    @Autowired
    EntityManager em;

    @Override
    public DcDutiesNameEntity add(DcDutiesNameEntity entity) {

        return  dcDutiesNameEntityRepository.saveAndFlush(entity);
    }

    @Override
    public void delete(int id) {
        dcDutiesNameEntityRepository.delete(id);
    }

    public DcDutiesNameEntity getByName(String name) {
        return dcDutiesNameEntityRepository.getByName(name);
    }

    @Override
    public DcDutiesNameEntity edit(DcDutiesNameEntity entity) {
        return dcDutiesNameEntityRepository.saveAndFlush(entity);
    }

    @Override
    @Transactional
    public List<DcDutiesNameEntity> getAll() {
        return dcDutiesNameEntityRepository.findAll();
    }

    public List getAllDutiesNames(){

        Session session = ((Session) em.getDelegate()).getSessionFactory().openSession();

        Criteria criteria = session.createCriteria(DcDutiesNameEntity.class);

        criteria.setProjection(Projections.property("name"));
        criteria.setProjection(Projections.property("id"));

        return criteria.list();
    }
}
