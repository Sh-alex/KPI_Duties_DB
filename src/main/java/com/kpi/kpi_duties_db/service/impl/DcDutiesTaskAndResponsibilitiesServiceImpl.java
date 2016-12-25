package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.dcduties.DcDutiesTasksAndResponsibilitiesEntity;
import com.kpi.kpi_duties_db.service.DcDutiesTaskAndResponsibilitiesService;
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
 * @since 27.08.2016
 */

@Service
public class DcDutiesTaskAndResponsibilitiesServiceImpl extends BaseServiceImpl<DcDutiesTasksAndResponsibilitiesEntity> implements DcDutiesTaskAndResponsibilitiesService {

    @Autowired
    private HibernateTemplate hibernateTemplate;

    @Override
    @Transactional(readOnly = true)
    public List<DcDutiesTasksAndResponsibilitiesEntity> findByParams(String text, String sortDirection, Integer offset, Integer limit) {
        Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(DcDutiesTasksAndResponsibilitiesEntity.class);
        if (text != null) {
            criteria.add(Restrictions.ilike("text", text, MatchMode.ANYWHERE));
        }
        if (sortDirection != null) {
            if (sortDirection.equals("SORT_ASC")) {
                criteria.addOrder(Order.asc("text"));
            } else
                criteria.addOrder(Order.desc("text"));
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
