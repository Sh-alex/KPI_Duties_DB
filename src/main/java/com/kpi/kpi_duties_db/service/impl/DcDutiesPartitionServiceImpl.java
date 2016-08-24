package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.DcDutiesPartitionEntity;
import com.kpi.kpi_duties_db.repository.DcDutiesPartitionRepository;
import com.kpi.kpi_duties_db.service.DcDutiesPartitionService;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.List;

@Service
public class DcDutiesPartitionServiceImpl implements DcDutiesPartitionService {

    @Autowired
    EntityManager em;

    @Autowired
    private DcDutiesPartitionRepository dcDutiesPartitionRepository;

    @Override
    public DcDutiesPartitionEntity add(DcDutiesPartitionEntity entity) {
        DcDutiesPartitionEntity savedDcDutiesPartitionEntity = dcDutiesPartitionRepository.saveAndFlush(entity);

        return savedDcDutiesPartitionEntity;
    }

    @Override
    public void delete(int id) {
        dcDutiesPartitionRepository.delete(id);
    }

    public DcDutiesPartitionEntity getByName(String name) {
        return dcDutiesPartitionRepository.getByName(name);
    }

    @Override
    public DcDutiesPartitionEntity edit(DcDutiesPartitionEntity entity) {
        return dcDutiesPartitionRepository.saveAndFlush(entity);
    }

    @Override
    public List<DcDutiesPartitionEntity> getAll() {
        return dcDutiesPartitionRepository.findAll();
    }

    public List getAllDutiesNames(){
        Session session = ((Session) em.getDelegate()).getSessionFactory().openSession();

        Criteria criteria = session.createCriteria(DcDutiesPartitionEntity.class);

        criteria.setProjection(Projections.property("dcDutiesPartitionName"));
        return criteria.list();
    }
}
