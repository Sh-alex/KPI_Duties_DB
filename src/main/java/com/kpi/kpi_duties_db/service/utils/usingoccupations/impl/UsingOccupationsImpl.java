package com.kpi.kpi_duties_db.service.utils.usingoccupations.impl;

import com.kpi.kpi_duties_db.domain.RtDutiesCodeEntity;
import com.kpi.kpi_duties_db.domain.RtDutiesEntity;
import com.kpi.kpi_duties_db.service.utils.usingoccupations.UsingOccupations;
import com.kpi.kpi_duties_db.shared.response.IdNameListResponse;
import com.kpi.kpi_duties_db.shared.response.support.IdNameResponse;
import org.hibernate.Criteria;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.HibernateTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 07.11.2016
 */

@Service
public class UsingOccupationsImpl implements UsingOccupations {

    @Autowired
    HibernateTemplate hibernateTemplate;

    @Override
    @Transactional
    public IdNameListResponse findUsingOccupationsIdForCode(IdNameListResponse response, String nameParentId) {

        List<IdNameResponse> idNameResponses = response.getIdNameResponses();

        for (IdNameResponse item : idNameResponses) {
            Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtDutiesCodeEntity.class, "rtDutiesCode");
            criteria.createAlias("rtDutiesCode.rtCodeEntity", "rtCode");
            criteria.add(Restrictions.eq("rtCode." + nameParentId, item.getId()));
            criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);

            List<RtDutiesCodeEntity> list = criteria.list();

            List<Integer> usingOccupationsId = list.stream().map(i -> i.getRtDutiesId()).distinct().collect(Collectors.toList());

            item.setUsingOccupationsId(usingOccupationsId);
        }

        return response;
    }

    @Override
    @Transactional
    public IdNameListResponse findUsingOccupationsIdForRtDutiesMustKnow(IdNameListResponse response) {

        List<IdNameResponse> idNameResponses = response.getIdNameResponses();

        for (IdNameResponse item : idNameResponses) {

            Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtDutiesEntity.class, "rtDuties");
            criteria.createAlias("rtDuties.rtDutiesMustKnowEntities", "rtDutiesMustKnowEntities");
            criteria.add(Restrictions.eq("rtDutiesMustKnowEntities.dcDutiesMustKnowId", item.getId()));
            criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);

            List<RtDutiesEntity> list = criteria.list();

            List<Integer> usingOccupationsId = list.stream().map(i -> i.getId()).distinct().collect(Collectors.toList());

            item.setUsingOccupationsId(usingOccupationsId);
        }

        return response;
    }

    @Override
    @Transactional
    public IdNameListResponse findUsingOccupationsIdForRtDutiesQualificationRequirements(IdNameListResponse response) {

        List<IdNameResponse> idNameResponses = response.getIdNameResponses();

        for (IdNameResponse item : idNameResponses) {

            Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtDutiesEntity.class, "rtDuties");
            criteria.createAlias("rtDuties.rtDutiesQualificationRequirementsEntities", "rtDutiesQualificationRequirementsEntities");
            criteria.add(Restrictions.eq("rtDutiesQualificationRequirementsEntities.dcDutiesQualificationRequirementsId", item.getId()));
            criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);

            List<RtDutiesEntity> list = criteria.list();

            List<Integer> usingOccupationsId = list.stream().map(i -> i.getId()).distinct().collect(Collectors.toList());

            item.setUsingOccupationsId(usingOccupationsId);
        }

        return response;
    }

    @Override
    @Transactional
    public IdNameListResponse findUsingOccupationsIdForRtDutiesTaskAndResponsibilities(IdNameListResponse response) {

        List<IdNameResponse> idNameResponses = response.getIdNameResponses();

        for (IdNameResponse item : idNameResponses) {

            Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtDutiesEntity.class, "rtDuties");
            criteria.createAlias("rtDuties.rtDutiesTaskAndResponsibilitiesEntities", "rtDutiesTaskAndResponsibilitiesEntities");
            criteria.add(Restrictions.eq("rtDutiesTaskAndResponsibilitiesEntities.dcDutiesTasksAndResponsibilitiesId", item.getId()));
            criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);

            List<RtDutiesEntity> list = criteria.list();

            List<Integer> usingOccupationsId = list.stream().map(i -> i.getId()).distinct().collect(Collectors.toList());

            item.setUsingOccupationsId(usingOccupationsId);
        }

        return response;
    }

    @Override
    @Transactional
    public IdNameListResponse findUsingOccupationsIdForDcDutiesName(IdNameListResponse response) {

        List<IdNameResponse> idNameResponses = response.getIdNameResponses();

        for (IdNameResponse item : idNameResponses) {

            Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtDutiesEntity.class, "rtDuties");

            criteria.add(Restrictions.eq("rtDuties.dcDutiesNameId", item.getId()));
            criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);

            List<RtDutiesEntity> list = criteria.list();

            List<Integer> usingOccupationsId = list.stream().map(i -> i.getId()).distinct().collect(Collectors.toList());

            item.setUsingOccupationsId(usingOccupationsId);
        }

        return response;
    }



    @Override
    @Transactional
    public IdNameListResponse findUsingOccupationsIdForDcDutiesPartition(IdNameListResponse response) {

        List<IdNameResponse> idNameResponses = response.getIdNameResponses();

        for (IdNameResponse item : idNameResponses) {

            Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtDutiesEntity.class, "rtDuties");

            criteria.add(Restrictions.eq("rtDuties.dcDutiesPartitionId", item.getId()));
            List<RtDutiesEntity> list = criteria.list();

            List<Integer> usingOccupationsId = list.stream().map(i -> i.getId()).distinct().collect(Collectors.toList());

            item.setUsingOccupationsId(usingOccupationsId);
        }

        return response;
    }
}
