package com.kpi.kpi_duties_db.repository.dao.impl;

import com.kpi.kpi_duties_db.domain.dcduties.RtDutiesEntity;
import com.kpi.kpi_duties_db.repository.RtDutiesRepository;
import com.kpi.kpi_duties_db.repository.dao.RtDutiesDao;
import com.kpi.kpi_duties_db.shared.dto.occupation.OccupationsSearchResultDto;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.criterion.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.HibernateTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
    private RtDutiesRepository repository;

    @Autowired
    private HibernateTemplate hibernateTemplate;

    @Override
    @Transactional(readOnly = true)
    public OccupationsSearchResultDto findByFields(Map<String, Object> paramsMap) {
        OccupationsSearchResultDto result = new OccupationsSearchResultDto();

        Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtDutiesEntity.class, "rtDuties");

        criteria.setFetchMode("rtDutiesEntities", FetchMode.SELECT);
        criteria.setFetchMode("rtDutiesCodeEntities", FetchMode.SELECT);
        criteria.setFetchMode("dutiesValidityDateEntities", FetchMode.SELECT);
        criteria.setFetchMode("rtDutiesQualificationRequirementsEntities", FetchMode.SELECT);
        criteria.setFetchMode("rtDutiesMustKnowEntities", FetchMode.SELECT);
        criteria.setFetchMode("rtDutiesTaskAndResponsibilitiesEntities", FetchMode.SELECT);


        Integer offset = 0;
        Integer limit = 0;
        Boolean createdDatesAlias = false;
        if (paramsMap == null || paramsMap.isEmpty()) {
            result.setEntities(repository.findAll());
            //Загальна кількість посад, що задовольняють критерії пошуку (для пагінації на front-end)
            result.setResultSize(result.getEntities().size());
            return result;
        } else {
            if (paramsMap.get("startFrom") != null || paramsMap.get("stopFrom") != null || paramsMap.get("stopFrom") != null || paramsMap.get("stopTo") != null) {
                criteria.createAlias("rtDuties.dutiesValidityDateEntities", "dates");
                createdDatesAlias = true;
            }
            for (String paramName : paramsMap.keySet()) {
                Object value = paramsMap.get(paramName);
                if (value != null) {
                    switch (paramName) {
                        case "idList":
                            criteria.add(Restrictions.in("id", (ArrayList) value));
                            break;
                        case "rtDutiesName":
                            if (paramsMap.get("searchType") != null && paramsMap.get("searchType").equals("MATCH_STRING")) {
                                criteria.add(Restrictions.ilike("name", (String) value, MatchMode.EXACT));
                            }
                            if (paramsMap.get("searchType") != null && paramsMap.get("searchType").equals("CONTAINS_STRING")) {
                                criteria.add(Restrictions.ilike("name", (String) value, MatchMode.ANYWHERE));
                            }
                            break;
                        case "dcDutiesPartitionId":
                            criteria.add(Restrictions.in("dcDutiesPartitionId", (ArrayList) value));
                            break;
                        case "dcDutiesNames":
                            //OR LIKE
                            if (paramsMap.get("searchType") != null && paramsMap.get("searchType").equals("SOME_TAGS")) {
                                Disjunction disjunction = Restrictions.disjunction();
                                for (String keyword : (List<String>) paramsMap.get(paramName)) {
                                    disjunction.add(Restrictions.ilike("name", keyword, MatchMode.ANYWHERE));
                                }
                                criteria.add(disjunction);
                            }
                            //AND LIKE
                            if (paramsMap.get("searchType") != null && paramsMap.get("searchType").equals("ALL_TAGS")) {
                                Conjunction conjunction = Restrictions.conjunction();
                                for (String keyword : (List<String>) paramsMap.get(paramName)) {
                                    conjunction.add(Restrictions.ilike("name", keyword, MatchMode.ANYWHERE));
                                }
                                criteria.add(conjunction);
                            }
                            break;
                        case "startFrom":
                            criteria.add(Restrictions.ge("dates.start", value));
                            break;
                        case "startTo":
                            criteria.add(Restrictions.le("dates.start", value));
                            break;
                        case "stopFrom":
                            criteria.add(Restrictions.ge("dates.stop", value));
                            break;
                        case "stopTo":
                            criteria.add(Restrictions.le("dates.stop", value));
                            break;
                        case "offset":
                            offset = (Integer) value;
                            break;
                        case "limit":
                            limit = (Integer) value;
                            break;
                    }
                }
            }
        }

        if (paramsMap.get("inKpi") != null && paramsMap.get("inKpi") != null) {
            if (paramsMap.get("inKpi").equals("ONLY_IN_KPI")) {
                DetachedCriteria detached = DetachedCriteria.forClass(RtDutiesEntity.class);
                detached.setProjection(Projections.property("id"));
                detached.createAlias("dutiesValidityDateEntities", "dates");
                detached.add(Restrictions.eq("dates.isInKpi", false)); //Знаходжу посади, які містять дату БЕЗ приналежності до КПІ
                criteria.add(Property.forName("id").notIn(detached));
            }
            if (paramsMap.get("inKpi").equals("ONLY_IN_STATE")) {
                DetachedCriteria detached = DetachedCriteria.forClass(RtDutiesEntity.class);
                detached.setProjection(Projections.property("id"));
                detached.createAlias("dutiesValidityDateEntities", "dates");
                detached.add(Restrictions.eq("dates.isInKpi", true)); //Знаходжу посади, які містять дату З приналежності до КПІ
                criteria.add(Property.forName("id").notIn(detached));
            }
        }

        //Загальна кількість посад, що задовольняють критерії пошуку (для пагінації на front-end)
        Integer resultSize = ((Number) criteria.setProjection(Projections.rowCount()).uniqueResult()).intValue();
        result.setResultSize(resultSize);
        criteria.setProjection(null);

        if (paramsMap.get("sortField") != null) {
            if(!createdDatesAlias){
                criteria.createAlias("rtDuties.dutiesValidityDateEntities", "dates");
            }
            addOrder(criteria, (String) paramsMap.get("sortField"), (String) paramsMap.get("sortDirection"));
        }
        if (offset > 0) {
            criteria.setFirstResult(offset);
        }
        if (limit >= 0) {
            criteria.setMaxResults(limit);
        }
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        result.setEntities(criteria.list());

        return result;
    }

    private void addOrder(Criteria criteria, String field, String direction) {
        switch (field) {
            case "OCCUPATION_GROUP":
                criteria.createAlias("rtDuties.dcDutiesPartitionEntity", "dcDutiesPartitionEntity");
                if (direction.equals("SORT_ASC")) {
                    criteria.addOrder(Order.asc("dcDutiesPartitionEntity.name"));
                } else
                    criteria.addOrder(Order.desc("dcDutiesPartitionEntity.name"));
                break;
            case "OCCUPATION_NAME":
                if (direction.equals("SORT_ASC")) {
                    criteria.addOrder(Order.asc("rtDuties.name"));
                } else
                    criteria.addOrder(Order.desc("rtDuties.name"));
                break;
            case "START_IN_STATE_DATE":
                if (direction.equals("SORT_ASC")) {
                    criteria.addOrder(Order.asc("dates.start"));
                } else {
                    criteria.addOrder(Order.desc("dates.start"));
                }
                break;
            case "STOP_IN_STATE_DATE":
                if (direction.equals("SORT_ASC")) {
                    criteria.addOrder(Order.asc("dates.stop"));
                } else {
                    criteria.addOrder(Order.desc("dates.stop"));
                }
                break;
            case "START_IN_KPI_DATE":
                if (direction.equals("SORT_ASC")) {
                    criteria.addOrder(Order.asc("dates.start"));
                } else {
                    criteria.addOrder(Order.desc("dates.start"));
                }
                break;
            case "STOP_IN_KPI_DATE":
                if (direction.equals("SORT_ASC")) {
                    criteria.addOrder(Order.asc("dates.stop"));
                } else {
                    criteria.addOrder(Order.desc("dates.stop"));
                }
                break;
        }
    }
}