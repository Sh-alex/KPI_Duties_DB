package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.dcduties.DcCodeZkpptrEntity;
import com.kpi.kpi_duties_db.repository.DcCodeZkpptrRepository;
import com.kpi.kpi_duties_db.service.DcCodeZkpptrService;
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
 * @since 25.08.2016
 */

@Service
public class DcCodeZkpptrServiceImpl extends BaseServiceImpl<DcCodeZkpptrEntity> implements DcCodeZkpptrService {

    @Autowired
    private DcCodeZkpptrRepository repository;

    @Autowired
    private HibernateTemplate hibernateTemplate;

    @Override
    public DcCodeZkpptrEntity findByName(String name) {
        return repository.findByName(name);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DcCodeZkpptrEntity> findByParams(String name, String sortDirection, Integer offset, Integer limit) {
        Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(DcCodeZkpptrEntity.class);
        if (name != null) {
            criteria.add(Restrictions.ilike("name", name, MatchMode.ANYWHERE));
        }
        if (sortDirection != null && !sortDirection.equals("")) {
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
