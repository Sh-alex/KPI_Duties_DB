package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.RtDutiesEntity;
import com.kpi.kpi_duties_db.repository.RtDutiesEntityRepository;
import com.kpi.kpi_duties_db.service.RtDutiesEntityService;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Service
public class RtDutiesEntityServiceImpl implements RtDutiesEntityService {

    @Autowired
    private RtDutiesEntityRepository rtDutiesEntityRepository;

    @Autowired
    EntityManager em;

    @Override
    public RtDutiesEntity add(RtDutiesEntity entity) {
        return  rtDutiesEntityRepository.saveAndFlush(entity);
    }

    @Override
    public void delete(int id) {
        rtDutiesEntityRepository.delete(id);
    }

    public RtDutiesEntity getByName(String name) {
        return rtDutiesEntityRepository.getByName(name);
    }

    @Override
    public RtDutiesEntity edit(RtDutiesEntity entity) {
        return rtDutiesEntityRepository.saveAndFlush(entity);
    }

    @Override
    @Transactional
    public List<RtDutiesEntity> getAll() {
        return rtDutiesEntityRepository.findAll();
    }

    public List getAllRtDutiesNames(){
        Session session = ((Session) em.getDelegate()).getSessionFactory().openSession();

        Criteria criteria = session.createCriteria(RtDutiesEntity.class);

        criteria.setProjection(Projections.property("rtDutiesName"));
        criteria.setProjection(Projections.property("rtDutiesId"));

        return criteria.list();
    }
}