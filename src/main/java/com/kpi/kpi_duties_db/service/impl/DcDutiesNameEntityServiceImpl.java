package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.DcDutiesNameEntity;
import com.kpi.kpi_duties_db.repository.DcDutiesNameEntityRepository;
import com.kpi.kpi_duties_db.service.BaseEntityService;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.List;

@Service
public class DcDutiesNameEntityServiceImpl  implements BaseEntityService<DcDutiesNameEntity>{

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
    public List<DcDutiesNameEntity> getAll() {
        return dcDutiesNameEntityRepository.findAll();
    }

    public List getAllDutiesNames(){

        Session session = ((Session) em.getDelegate()).getSessionFactory().openSession();

        Criteria criteria = session.createCriteria(DcDutiesNameEntity.class);

        criteria.setProjection(Projections.property("name"));

        return criteria.list();
    }
}
