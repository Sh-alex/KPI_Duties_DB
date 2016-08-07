package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.DcDutiesPartitionEntity;
import com.kpi.kpi_duties_db.repository.DcDutiesPartitionEntityRepository;
import com.kpi.kpi_duties_db.service.BaseEntityService;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.List;

@Service
public class DcDutiesPartitionEntityServiceImpl implements BaseEntityService<DcDutiesPartitionEntity> {

    @Autowired
    EntityManager em;

    @Autowired
    private DcDutiesPartitionEntityRepository dcDutiesPartitionEntityRepository;

    @Override
    public DcDutiesPartitionEntity add(DcDutiesPartitionEntity entity) {
        DcDutiesPartitionEntity savedDcDutiesPartitionEntity = dcDutiesPartitionEntityRepository.saveAndFlush(entity);

        return savedDcDutiesPartitionEntity;
    }

    @Override
    public void delete(int id) {
        dcDutiesPartitionEntityRepository.delete(id);
    }

    public DcDutiesPartitionEntity getByName(String name) {
        return dcDutiesPartitionEntityRepository.getByName(name);
    }

    @Override
    public DcDutiesPartitionEntity edit(DcDutiesPartitionEntity entity) {
        return dcDutiesPartitionEntityRepository.saveAndFlush(entity);
    }

    @Override
    public List<DcDutiesPartitionEntity> getAll() {
        return dcDutiesPartitionEntityRepository.findAll();
    }

    public List getAllDutiesNames(){
        Session session = ((Session) em.getDelegate()).getSessionFactory().openSession();

        Criteria criteria = session.createCriteria(DcDutiesPartitionEntity.class);

        criteria.setProjection(Projections.property("dcDutiesPartitionName"));
        return criteria.list();
    }
}
