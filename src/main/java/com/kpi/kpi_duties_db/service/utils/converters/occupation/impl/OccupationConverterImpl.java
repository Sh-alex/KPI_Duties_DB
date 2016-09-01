package com.kpi.kpi_duties_db.service.utils.converters.occupation.impl;

import com.kpi.kpi_duties_db.domain.*;
import com.kpi.kpi_duties_db.service.DcDutiesMustKnowService;
import com.kpi.kpi_duties_db.service.DcDutiesQualificationRequirementsService;
import com.kpi.kpi_duties_db.service.DcDutiesTaskAndResponsibilitiesService;
import com.kpi.kpi_duties_db.service.utils.converters.occupation.OccupationConverter;
import com.kpi.kpi_duties_db.shared.addingoccupation.request.OccupationRequest;
import com.kpi.kpi_duties_db.shared.addingoccupation.request.support.CodeOccupation;
import com.kpi.kpi_duties_db.shared.addingoccupation.request.support.NameOccupation;
import com.kpi.kpi_duties_db.shared.addingoccupation.request.support.RequirementsOccupation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 01.09.2016
 */

@Component
public class OccupationConverterImpl implements OccupationConverter {

    @Autowired
    DcDutiesTaskAndResponsibilitiesService dcDutiesTaskAndResponsibilitiesService;

    @Autowired
    DcDutiesMustKnowService dcDutiesMustKnowService;

    @Autowired
    DcDutiesQualificationRequirementsService dcDutiesQualificationRequirementsService;

    @Override
    public RtDutiesEntity toRtDutiesEntityFromOccupationRequest(OccupationRequest request) {

        RtDutiesEntity entity = new RtDutiesEntity();

        NameOccupation nameOccupation = request.getNameOccupation();

        entity.setDcDutiesPartitionId(nameOccupation.getDcDutiesPartitionId());

        if (!nameOccupation.getRtDutiesParentId().equals(-1)) {
            entity.setParentId(nameOccupation.getRtDutiesParentId());
        }
        entity.setRtDutiesName(nameOccupation.getRtDutiesName());
        entity.setRtDutiesNameShort(nameOccupation.getRtDutiesNameShort());
        entity.setDcDutiesNameId(nameOccupation.getDcDutiesNameId());


        return entity;
    }

    @Override
    public List<DutiesValidityDateEntity> toDutiesValidityDateEntityListFromOccupationRequest(OccupationRequest request, Integer rtDutiesId) {

        List<DutiesValidityDateEntity> list = new ArrayList<>();

        DutiesValidityDateEntity entity = new DutiesValidityDateEntity();

        for (int i = 0; i < 1; i++) {
            if (i == 0) {

            } else {
                entity.setStart(request.getDurationOccupation().getCreatingInKPIDate());
                entity.setInKpi(false);
            }

            entity.setVirtual(request.getFeaturesOccupation().getVirtual());
            entity.setRtDutiesId(rtDutiesId);
        }

        list.add(entity);

        return list;
    }

    @Override
    public List<RtCodeEntity> toRtCodeEntityListFromOccupationRequest(OccupationRequest request) {

        List<CodeOccupation> codes = request.getCodes();

        List<RtCodeEntity> list = new ArrayList<>();
        for (CodeOccupation codeOccupation : codes) {
            RtCodeEntity entity = new RtCodeEntity();
            entity.setCodeDKHPId(codeOccupation.getCodeDKHPId());
            entity.setCodeETKDId(codeOccupation.getCodeETDKId());
            entity.setCodeKPId(codeOccupation.getCodeKPId());
            entity.setCodeZKPPTRId(codeOccupation.getCodeZKPPTRId());
            entity.setDateStart(codeOccupation.getPortionStartDate());
            entity.setDateStop(codeOccupation.getPortionEndDate());
        }
        return list;
    }

    @Override
    public List<RtDutiesTaskAndResponsibilitiesEntity> toRtDutiesTaskAndResponsibilitiesEntityListFromOccupationRequest(OccupationRequest request, Integer rtDutiesId) {

        List<RtDutiesTaskAndResponsibilitiesEntity> list = new ArrayList<>();

        List<RequirementsOccupation> responsibilities = request.getResponsibilities();

        for (RequirementsOccupation responsibility : responsibilities) {
            RtDutiesTaskAndResponsibilitiesEntity entity = new RtDutiesTaskAndResponsibilitiesEntity();

            if (responsibility.getId() == null) {
                DcDutiesTasksAndResponsibilitiesEntity tasksAndResponsibilitiesEntity = new DcDutiesTasksAndResponsibilitiesEntity();
                tasksAndResponsibilitiesEntity.setText(responsibility.getText());
                DcDutiesTasksAndResponsibilitiesEntity addedEntity = dcDutiesTaskAndResponsibilitiesService.add(tasksAndResponsibilitiesEntity);
                entity.setDcDutiesTasksAndResponsibilitiesId(addedEntity.getId());
            } else {
                entity.setDcDutiesTasksAndResponsibilitiesId(responsibility.getId());
            }

            entity.setRtDutiesId(rtDutiesId);
            entity.setDateStart(responsibility.getDateStart());
            entity.setDateEnd(responsibility.getDateEnd());

            list.add(entity);
        }

        return list;
    }

    @Override
    public List<RtDutiesMustKnowEntity> toRtDutiesMustKnowEntityListFromOccupationRequest(OccupationRequest request, Integer rtDutiesId) {
        List<RtDutiesMustKnowEntity> list = new ArrayList<>();

        List<RequirementsOccupation> responsibilities = request.getResponsibilities();

        for (RequirementsOccupation responsibility : responsibilities) {
            RtDutiesMustKnowEntity entity = new RtDutiesMustKnowEntity();

            if (responsibility.getId() == null) {
                DcDutiesMustKnowEntity dutiesMustKnowEntity = new DcDutiesMustKnowEntity();
                dutiesMustKnowEntity.setText(responsibility.getText());
                DcDutiesMustKnowEntity addedEntity = dcDutiesMustKnowService.add(dutiesMustKnowEntity);
                entity.setDcDutiesMustKnowId(addedEntity.getId());
            } else {
                entity.setDcDutiesMustKnowId(responsibility.getId());
            }

            entity.setRtDutiesId(rtDutiesId);
            entity.setDateStart(responsibility.getDateStart());
            entity.setDateEnd(responsibility.getDateEnd());

            list.add(entity);
        }

        return list;
    }

    @Override
    public List<RtDutiesQualificationRequirementsEntity> toRtDutiesQualificationRequirementsEntityListFromOccupationRequest(OccupationRequest request, Integer rtDutiesId) {

        List<RtDutiesQualificationRequirementsEntity> list = new ArrayList<>();

        List<RequirementsOccupation> responsibilities = request.getResponsibilities();

        for (RequirementsOccupation responsibility : responsibilities) {
            RtDutiesQualificationRequirementsEntity entity = new RtDutiesQualificationRequirementsEntity();

            if (responsibility.getId() == null) {
                DcDutiesQualificationRequirementsEntity requirementsEntity = new DcDutiesQualificationRequirementsEntity();
                requirementsEntity.setText(responsibility.getText());
                DcDutiesQualificationRequirementsEntity addedEntity = dcDutiesQualificationRequirementsService.add(requirementsEntity);
                entity.setDcDutiesQualificationRequirementsId(addedEntity.getId());
            } else {
                entity.setDcDutiesQualificationRequirementsId(responsibility.getId());
            }

            entity.setRtDutiesId(rtDutiesId);
            entity.setDateStart(responsibility.getDateStart());
            entity.setDateEnd(responsibility.getDateEnd());

            list.add(entity);
        }

        return list;
    }

}
