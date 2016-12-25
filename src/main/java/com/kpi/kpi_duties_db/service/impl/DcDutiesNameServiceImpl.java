package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.dcduties.DcDutiesNameEntity;
import com.kpi.kpi_duties_db.repository.DcDutiesNameRepository;
import com.kpi.kpi_duties_db.service.DcDutiesNameService;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.HibernateTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Service
public class DcDutiesNameServiceImpl extends BaseServiceImpl<DcDutiesNameEntity> implements DcDutiesNameService {

    @Autowired
    private DcDutiesNameRepository repository;

    @Autowired
    private HibernateTemplate hibernateTemplate;

    @Override
    public DcDutiesNameEntity findByName(String name){

        return repository.findByName(name);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DcDutiesNameEntity> findByParams(String name, String sortDirection, Integer offset, Integer limit) {
        Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(DcDutiesNameEntity.class);
        if (name != null) {
            criteria.add(Restrictions.ilike("name", name, MatchMode.ANYWHERE));
        }
        if (sortDirection != null) {
            if (sortDirection.equals("SORT_ASC")) {
                criteria.addOrder(Order.asc("name"));
            } else
                criteria.addOrder(Order.desc("name"));
        }

        if (offset != null && offset > 0) {
            criteria.setFirstResult(offset);
        }
        if (limit != null && limit >= 0) {
            criteria.setMaxResults(limit);
        }
        return criteria.list();
    }
}
