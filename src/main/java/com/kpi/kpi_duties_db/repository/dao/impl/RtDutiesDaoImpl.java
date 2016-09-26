package com.kpi.kpi_duties_db.repository.dao.impl;

import com.kpi.kpi_duties_db.domain.RtDutiesEntity;
import com.kpi.kpi_duties_db.repository.RtDutiesRepository;
import com.kpi.kpi_duties_db.repository.dao.RtDutiesDao;
import org.hibernate.Criteria;
import org.hibernate.criterion.*;
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
    @Transactional(readOnly = true)
    public List<RtDutiesEntity> findByFields(Map<String, Object> paramsMap) {
        Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtDutiesEntity.class, "rtDuties");
        Criteria criteriaForDatesInState = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtDutiesEntity.class, "rtDuties");
        Criteria criteriaForDatesInKpi = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtDutiesEntity.class, "rtDuties");
        criteria.createAlias("rtDuties.dutiesValidityDateEntities", "dates");
        criteriaForDatesInState.createAlias("rtDuties.dutiesValidityDateEntities", "dates");
        criteriaForDatesInKpi.createAlias("rtDuties.dutiesValidityDateEntities", "dates");
        if (paramsMap == null || paramsMap.isEmpty()) {
            return repository.findAll();
        } else {
            for (String paramName : paramsMap.keySet()) {
                Object value = paramsMap.get(paramName);
                if (value != null) {
                    switch (paramName) {
                        case "dcDutiesPartitionId":
                            criteria.add(Restrictions.eq("dcDutiesPartitionId", value));
                            break;
                        case "rtDutiesName":
                            if (paramsMap.get("searchType").equals("MATCH_STRING")) {
                                criteria.add(Restrictions.ilike("name", (String) value, MatchMode.EXACT));
                            }
                            if (paramsMap.get("searchType").equals("CONTAINS_STRING")) {
                                criteria.add(Restrictions.ilike("name", (String) value, MatchMode.ANYWHERE));
                            }
                            break;
                        case "dcDutiesNames":
                            //OR LIKE
                            if (paramsMap.get("searchType").equals("SOME_TAGS")) {
                                Disjunction disjunction = Restrictions.disjunction();
                                for (String keyword : (List<String>) paramsMap.get(paramName)) {
                                    disjunction.add(Restrictions.ilike("name", keyword, MatchMode.ANYWHERE));
                                }
                                criteria.add(disjunction);
                            }
                            //AND LIKE
                            if (paramsMap.get("searchType").equals("ALL_TAGS")) {
                                Conjunction conjunction = Restrictions.conjunction();
                                for (String keyword : (List<String>) paramsMap.get(paramName)) {
                                    conjunction.add(Restrictions.ilike("name", keyword, MatchMode.ANYWHERE));
                                }
                                criteria.add(conjunction);
                            }
                            break;
                        case "creatingInStateDate_from":
                            criteriaForDatesInState.add(Restrictions.and(Restrictions.eq("dates.isInKpi", false), Restrictions.ge("dates.start", value)));
                            break;
                        case "creatingInStateDate_to":
                            criteriaForDatesInState.add(Restrictions.and(Restrictions.eq("dates.isInKpi", false), Restrictions.le("dates.start", value)));
                            break;
                        case "cancelingInStateDate_from":
                            criteriaForDatesInState.add(Restrictions.and(Restrictions.eq("dates.isInKpi", false), Restrictions.ge("dates.stop", value)));
                            break;
                        case "cancelingInStateDate_to":
                            criteriaForDatesInState.add(Restrictions.and(Restrictions.eq("dates.isInKpi", false), Restrictions.le("dates.stop", value)));
                            break;
                        case "creatingInKPIDate_from":
                            criteriaForDatesInKpi.add(Restrictions.and(Restrictions.eq("dates.isInKpi", true), Restrictions.ge("dates.start", value)));
                            break;
                        case "creatingInKPIDate_to":
                            criteriaForDatesInKpi.add(Restrictions.and(Restrictions.eq("dates.isInKpi", true), Restrictions.le("dates.start", value)));
                            break;
                        case "cancelingInKPIDate_from":
                            criteriaForDatesInKpi.add(Restrictions.and(Restrictions.eq("dates.isInKpi", true), Restrictions.ge("dates.stop", value)));
                            break;
                        case "cancelingInKPIDate_to":
                            criteriaForDatesInKpi.add(Restrictions.and(Restrictions.eq("dates.isInKpi", true), Restrictions.le("dates.stop", value)));
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
            criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);

            //Пошук по обмеженням дат в державі та КПІ, повертає id посад
            criteriaForDatesInState.setProjection(Projections.distinct(Projections.property("id")));
            criteriaForDatesInKpi.setProjection(Projections.distinct(Projections.property("id")));

            List listByDates = criteriaForDatesInState.list();
            //Перетин двох множин, які відповідають всім умовам
            listByDates.retainAll(criteriaForDatesInKpi.list());

            //Якщо не знайдено відповідних посад - не додаю обмеження
            if (!listByDates.isEmpty()) {
                criteria.add(Restrictions.in("id", listByDates));
            }

            return criteria.list();
        }
    }
}
