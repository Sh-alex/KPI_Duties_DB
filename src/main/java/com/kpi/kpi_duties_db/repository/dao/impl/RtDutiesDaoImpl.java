package com.kpi.kpi_duties_db.repository.dao.impl;

import com.kpi.kpi_duties_db.domain.RtDutiesEntity;
import com.kpi.kpi_duties_db.repository.RtDutiesRepository;
import com.kpi.kpi_duties_db.repository.dao.RtDutiesDao;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 04.09.2016
 */

@Repository
public class RtDutiesDaoImpl implements RtDutiesDao {

    @Autowired
    RtDutiesRepository repository;

    @Autowired
    HibernateTemplate hibernateTemplate;

    @Override
    public RtDutiesEntity findById(Integer id) {
        Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtDutiesEntity.class);

        criteria.add(Restrictions.eq("id", id));

        return (RtDutiesEntity) criteria.uniqueResult();
    }

    @Override
    @Transactional(readOnly = true)
    public List<RtDutiesEntity> findByFields(Map<String, Object> paramsMap) {
        Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtDutiesEntity.class, "rtDuties");
        criteria.createAlias("rtDuties.dutiesValidityDateEntities", "dates");
        if (paramsMap == null || paramsMap.isEmpty()) {
            return repository.findAll();
        } else {
            for (String paramName : paramsMap.keySet()) {
                Object value = paramsMap.get(paramName);
                if (value != null) {
                    switch (paramName) {
                        case "dcDutiesPartitionId":
                            criteria.add(Restrictions.eq("DcDutiesPartitionId", value));
                            break;
                        case "rtDutiesName":
                            if(paramsMap.get("searchType").equals("MATCH_STRING")){
                                criteria.add(Restrictions.eq("rtDutiesName", value));
                            }
                            if(paramsMap.get("searchType").equals("CONTAINS_STRING")){
                                criteria.add(Restrictions.ilike("rtDutiesName", (String) value, MatchMode.ANYWHERE));
                            }
                            break;
                        case "dcDutiesNameId":
                            criteria.add(Restrictions.eq("dcDutiesNameId", value));
                            break;
                        case "creatingInStateDate_from":
                            criteria.add(Restrictions.eq("dates.isInKpi", false));
                            criteria.add(Restrictions.ge("dates.Start", value));
                            break;
                        case "creatingInStateDate_to":
                            criteria.add(Restrictions.eq("dates.isInKpi", false));
                            criteria.add(Restrictions.le("dates.Start", value));
                            break;
                        case "cancelingInStateDate_from":
                            criteria.add(Restrictions.eq("dates.isInKpi", false));
                            criteria.add(Restrictions.ge("dates.Stop", value));
                            break;
                        case "cancelingInStateDate_to":
                            criteria.add(Restrictions.eq("dates.isInKpi", false));
                            criteria.add(Restrictions.le("dates.Stop", value));
                            break;
                        case "creatingInKPIDate_from":
                            criteria.add(Restrictions.eq("dates.isInKpi", true));
                            criteria.add(Restrictions.ge("dates.Start", value));
                            break;
                        case "creatingInKPIDate_to":
                            criteria.add(Restrictions.eq("dates.isInKpi", true));
                            criteria.add(Restrictions.le("dates.Start", value));
                            break;
                        case "cancelingInKPIDate_from":
                            criteria.add(Restrictions.eq("dates.isInKpi", true));
                            criteria.add(Restrictions.ge("dates.Stop", value));
                            break;
                        case "cancelingInKPIDate_to":
                            criteria.add(Restrictions.eq("dates.isInKpi", true));
                            criteria.add(Restrictions.le("dates.Stop", value));
                            break;
                        /*case "offset":
                            offset = (Integer) value;
                            break;
                        case "limit":
                            limit = (Integer) value;
                            break;*/
                    }
                }
            }

           /* if (offset > 0) {
                criteria.setFirstResult(offset);
            }
            if (limit >= 0) {
                criteria.setMaxResults(limit);
            }*/
            return criteria.list();
        }
    }
}
