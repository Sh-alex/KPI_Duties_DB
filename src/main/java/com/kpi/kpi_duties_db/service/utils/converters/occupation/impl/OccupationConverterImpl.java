package com.kpi.kpi_duties_db.service.utils.converters.occupation.impl;

import com.kpi.kpi_duties_db.domain.*;
import com.kpi.kpi_duties_db.service.*;
import com.kpi.kpi_duties_db.service.utils.converters.occupation.OccupationConverter;
import com.kpi.kpi_duties_db.shared.dto.occupation.OccupationGetDto;
import com.kpi.kpi_duties_db.shared.request.occupation.OccupationGetRequest;
import com.kpi.kpi_duties_db.shared.request.occupation.OccupationRequest;
import com.kpi.kpi_duties_db.shared.request.occupation.support.CodeOccupation;
import com.kpi.kpi_duties_db.shared.request.occupation.support.NameOccupation;
import com.kpi.kpi_duties_db.shared.request.occupation.support.RequirementsOccupation;
import com.kpi.kpi_duties_db.shared.response.occupation.OccupationsGetResponse;
import com.kpi.kpi_duties_db.shared.response.occupation.support.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

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

    @Autowired
    DcDutiesPartitionService dcDutiesPartitionService;

    @Autowired
    DcDutiesNameService dcDutiesNameService;

    @Override
    public RtDutiesEntity toRtDutiesEntityFromOccupationRequest(OccupationRequest request) {

        RtDutiesEntity entity = new RtDutiesEntity();

        NameOccupation nameOccupation = request.getNameOccupation();

        entity.setDcDutiesPartitionId(nameOccupation.getDcDutiesPartitionId());

        if (!nameOccupation.getRtDutiesParentId().equals(-1)) {

            RtDutiesEntity rtDutiesEntity = new RtDutiesEntity();
            rtDutiesEntity.setId(nameOccupation.getRtDutiesParentId());
        }
        entity.setName(nameOccupation.getRtDutiesName());
        entity.setNameShort(nameOccupation.getRtDutiesNameShort());
        entity.setDcDutiesNameId(nameOccupation.getDcDutiesNameId());


        return entity;
    }

    @Override
    public List<DutiesValidityDateEntity> toDutiesValidityDateEntityListFromOccupationRequest(OccupationRequest request, Integer rtDutiesId) {

        List<DutiesValidityDateEntity> list = new ArrayList<>();

        for (int i = 0; i <= 1; i++) {
            DutiesValidityDateEntity entity = new DutiesValidityDateEntity();
            if (i == 0) {
                entity.setStart(request.getDurationOccupation().getCreatingInStateDate());
                entity.setInKpi(true);

            } else {
                entity.setStart(request.getDurationOccupation().getCreatingInKPIDate());
                entity.setInKpi(false);
            }

            entity.setVirtual(request.getFeaturesOccupation().getVirtual());
            RtDutiesEntity rtDutiesEntity = new RtDutiesEntity();
            rtDutiesEntity.setId(rtDutiesId);
            entity.setRtDutiesId(rtDutiesEntity.getId());

            list.add(entity);
        }

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

            list.add(entity);
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

            RtDutiesEntity rtDutiesEntity = new RtDutiesEntity();
            rtDutiesEntity.setId(rtDutiesId);
            entity.setRtDutiesId(rtDutiesEntity.getId());
            entity.setDateStart(responsibility.getDateStart());
            entity.setDateEnd(responsibility.getDateEnd());

            list.add(entity);
        }

        return list;
    }

    @Override
    public List<RtDutiesMustKnowEntity> toRtDutiesMustKnowEntityListFromOccupationRequest(OccupationRequest request, Integer rtDutiesId) {
        List<RtDutiesMustKnowEntity> list = new ArrayList<>();

        List<RequirementsOccupation> responsibilities = request.getMustKnow();

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

            RtDutiesEntity rtDutiesEntity = new RtDutiesEntity();
            rtDutiesEntity.setId(rtDutiesId);
            entity.setRtDutiesId(rtDutiesEntity.getId());
            entity.setDateStart(responsibility.getDateStart());
            entity.setDateEnd(responsibility.getDateEnd());

            list.add(entity);
        }

        return list;
    }

    @Override
    public List<RtDutiesQualificationRequirementsEntity> toRtDutiesQualificationRequirementsEntityListFromOccupationRequest(OccupationRequest request, Integer rtDutiesId) {

        List<RtDutiesQualificationRequirementsEntity> list = new ArrayList<>();

        List<RequirementsOccupation> responsibilities = request.getQualificationRequirements();

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

            RtDutiesEntity rtDutiesEntity = new RtDutiesEntity();
            rtDutiesEntity.setId(rtDutiesId);
            entity.setRtDutiesId(rtDutiesEntity.getId());
            entity.setDateStart(responsibility.getDateStart());
            entity.setDateEnd(responsibility.getDateEnd());

            list.add(entity);
        }

        return list;
    }

    @Override
    public OccupationGetDto toOccupationDtoFromOccupationGetRequest(OccupationGetRequest request) {
        if (request == null) {
            return null;
        }
        OccupationGetDto occupationGetDto = new OccupationGetDto();

        if (request.getSearchType() != null && !request.getSearchType().isEmpty()) {
            occupationGetDto.setSearchType(request.getSearchType().get(0));
        }
        if (request.getDcDutiesPartitionId() != null && !request.getDcDutiesPartitionId().isEmpty()) {
            occupationGetDto.setDcDutiesPartitionId(request.getDcDutiesPartitionId().get(0));
        }
        if (request.getRtDutiesName() != null && !request.getRtDutiesName().isEmpty()) {
            occupationGetDto.setRtDutiesName(request.getRtDutiesName().get(0));
        }
        if (request.getDcDutiesNames() != null && !request.getDcDutiesNames().isEmpty()) {
            occupationGetDto.setDcDutiesNames(request.getDcDutiesNames());
        }
        if (request.getCreatingInStateDate_from() != null && !request.getCreatingInStateDate_from().isEmpty()) {
            occupationGetDto.setCreatingInStateDate_from(request.getCreatingInStateDate_from().get(0));
        }
        if (request.getCreatingInStateDate_to() != null && !request.getCreatingInStateDate_to().isEmpty()) {
            occupationGetDto.setCreatingInStateDate_to(request.getCreatingInStateDate_to().get(0));
        }
        if (request.getCancelingInStateDate_from() != null && !request.getCancelingInStateDate_from().isEmpty()) {
            occupationGetDto.setCancelingInStateDate_from(request.getCancelingInStateDate_from().get(0));
        }
        if (request.getCancelingInStateDate_to() != null && !request.getCancelingInStateDate_to().isEmpty()) {
            occupationGetDto.setCancelingInStateDate_to(request.getCancelingInStateDate_to().get(0));
        }
        if (request.getCreatingInKPIDate_from() != null && !request.getCreatingInKPIDate_from().isEmpty()) {
            occupationGetDto.setCreatingInKPIDate_from(request.getCreatingInKPIDate_from().get(0));
        }
        if (request.getCreatingInKPIDate_to() != null && !request.getCreatingInKPIDate_to().isEmpty()) {
            occupationGetDto.setCreatingInKPIDate_to(request.getCreatingInKPIDate_to().get(0));
        }
        if (request.getCancelingInKPIDate_from() != null && !request.getCancelingInKPIDate_from().isEmpty()) {
            occupationGetDto.setCancelingInKPIDate_from(request.getCancelingInKPIDate_from().get(0));
        }
        if (request.getCancelingInKPIDate_to() != null && !request.getCancelingInKPIDate_to().isEmpty()) {
            occupationGetDto.setCancelingInKPIDate_to(request.getCancelingInKPIDate_to().get(0));
        }

        if (occupationGetDto.getDcDutiesNames() != null && !occupationGetDto.getDcDutiesNames().isEmpty()) {
            String[] split = occupationGetDto.getDcDutiesNames().get(0).split(",");
            occupationGetDto.getDcDutiesNames().clear();
            for (String tag : split) {
                occupationGetDto.getDcDutiesNames().add(tag);
            }
        }

        return occupationGetDto;
    }

    @Override
    public Map<String, Object> toParamMapFromOccupationGetDto(OccupationGetDto dto) {
        if (dto == null) {
            return null;
        }

        Map<String, Object> params = new HashMap<>();

        params.put("searchType", dto.getSearchType());
        params.put("dcDutiesPartitionId", dto.getDcDutiesPartitionId());
        params.put("rtDutiesName", dto.getRtDutiesName());
        params.put("dcDutiesNames", dto.getDcDutiesNames());
        params.put("creatingInStateDate_from", dto.getCreatingInStateDate_from());
        params.put("creatingInStateDate_to", dto.getCreatingInStateDate_to());
        params.put("cancelingInStateDate_from", dto.getCancelingInStateDate_from());
        params.put("cancelingInStateDate_to", dto.getCancelingInStateDate_to());
        params.put("creatingInKPIDate_from", dto.getCreatingInKPIDate_from());
        params.put("creatingInKPIDate_to", dto.getCreatingInKPIDate_to());
        params.put("cancelingInKPIDate_from", dto.getCancelingInKPIDate_from());
        params.put("cancelingInKPIDate_to", dto.getCancelingInKPIDate_to());

        return params;
    }

    @Override
    public OccupationsGetResponse toOccupationsGetResponseFromRtDutiesEntityList(List<RtDutiesEntity> list) {

        OccupationsGetResponse response = new OccupationsGetResponse();

        Map<Integer, ItemById> itemsById = new HashMap<>();
        List<Integer> itemsList = new ArrayList<>();
        for (RtDutiesEntity entity : list) {
            ItemById itemById = new ItemById();

            DataInItem dataInItem = new DataInItem();
            Set<DutiesValidityDateEntity> dutiesValidityDateEntities = entity.getDutiesValidityDateEntities();
            if (dutiesValidityDateEntities != null) {
                List<DutiesValidityDateEntity> dateInKpi = dutiesValidityDateEntities.stream().filter(date -> date.getInKpi() == true).collect(Collectors.toList());
                List<DutiesValidityDateEntity> dateInState = dutiesValidityDateEntities.stream().filter(date -> date.getInKpi() == false).collect(Collectors.toList());

                dataInItem.setCancelingInKPIDate(dateInKpi == null ? null : dateInKpi.get(0).getStop());
                dataInItem.setCreatingInKPIDate(dateInKpi == null ? null : dateInKpi.get(0).getStart());
                dataInItem.setCancelingInStateDate(dateInState == null ? null : dateInState.get(0).getStop());
                dataInItem.setCreatingInStateDate(dateInState == null ? null : dateInState.get(0).getStart());

                Boolean isVirtual = null;

                if (dateInKpi != null) {
                    isVirtual = dateInKpi.get(0).getVirtual();
                } else {
                    isVirtual = dateInState == null ? null : dateInState.get(0).getVirtual();
                }

                dataInItem.setVirtual(isVirtual);

                dataInItem.setInKPI(dateInKpi == null ? false : true);
            }

            DcDutiesPartitionEntity dcDutiesPartitionEntity = entity.getDcDutiesPartitionEntity();
            if (dcDutiesPartitionEntity != null) {
                dataInItem.setOccupationGroup(dcDutiesPartitionEntity.getName());
            }

            dataInItem.setOccupationName(entity.getName());
            dataInItem.setOccupationNameMin(entity.getNameShort());

            List<CodesInData> codes = new ArrayList<>();
            for (RtDutiesCodeEntity rtDutiesCodeEntity : entity.getRtDutiesCodeEntities()) {

                RtCodeEntity rtCodeEntity = rtDutiesCodeEntity.getRtCodeEntity();

                if (rtCodeEntity != null) {
                    CodesInData codesInData = new CodesInData();
                    DcCodeDkhpEntity dkhpEntity = rtCodeEntity.getCodeDkhpEntity();
                    if (dkhpEntity != null) {
                        Code code = new Code();
                        code.setId(dkhpEntity.getId());
                        code.setVal(dkhpEntity.getName());
                        codesInData.setCodeDKHP(code);
                    }

                    DcCodeEtkdEntity etkdEntity = rtCodeEntity.getCodeEtkdEntity();
                    if (etkdEntity != null) {
                        Code code = new Code();
                        code.setId(etkdEntity.getId());
                        code.setVal(etkdEntity.getName());
                        codesInData.setCodeETDK(code);
                    }

                    DcCodeKpEntity kpEntity = rtCodeEntity.getCodeKpEntity();
                    if (kpEntity != null) {
                        Code code = new Code();
                        code.setId(kpEntity.getId());
                        code.setVal(kpEntity.getName());
                        codesInData.setCodeKP(code);
                    }

                    DcCodeZkpptrEntity zkpptrEntity = rtCodeEntity.getCodeZkpptrEntity();
                    if (zkpptrEntity != null) {
                        Code code = new Code();
                        code.setId(zkpptrEntity.getId());
                        code.setVal(zkpptrEntity.getName());
                        codesInData.setCodeZKPPTR(code);
                    }

                    codesInData.setPortionStartDate(rtCodeEntity.getDateStart());
                    codesInData.setPortionEndDate(rtCodeEntity.getDateStop());
                    codes.add(codesInData);
                }
            }

            dataInItem.setCodes(codes);

            List<Requirement> haveToKnowList = new ArrayList<>();
            for (RtDutiesMustKnowEntity rtDutiesMustKnowEntity : entity.getRtDutiesMustKnowEntities()) {
                Requirement haveToKnow = new Requirement();
                haveToKnow.setId(rtDutiesMustKnowEntity.getDcDutiesMustKnowId());
                haveToKnow.setText(rtDutiesMustKnowEntity.getDcDutiesMustKnowEntity().getText());
                haveToKnow.setPortionStartDate(rtDutiesMustKnowEntity.getDateStart());
                haveToKnow.setPortionEndDate(rtDutiesMustKnowEntity.getDateEnd());

                haveToKnowList.add(haveToKnow);
            }
            dataInItem.setHaveToKnow(haveToKnowList);

            List<Requirement> responsibilitiesList = new ArrayList<>();
            for (RtDutiesTaskAndResponsibilitiesEntity rtDutiesTaskAndResponsibilitiesEntity : entity.getRtDutiesTaskAndResponsibilitiesEntities()) {
                Requirement responsibilities = new Requirement();
                responsibilities.setId(rtDutiesTaskAndResponsibilitiesEntity.getDcDutiesTasksAndResponsibilitiesId());
                responsibilities.setText(rtDutiesTaskAndResponsibilitiesEntity.getDcDutiesTasksAndResponsibilitiesEntity().getText());
                responsibilities.setPortionStartDate(rtDutiesTaskAndResponsibilitiesEntity.getDateStart());
                responsibilities.setPortionEndDate(rtDutiesTaskAndResponsibilitiesEntity.getDateEnd());

                responsibilitiesList.add(responsibilities);
            }
            dataInItem.setResponsibilities(responsibilitiesList);

            List<Requirement> qualiffRequirList = new ArrayList<>();
            for (RtDutiesQualificationRequirementsEntity rtDutiesQualificationRequirementsEntity : entity.getRtDutiesQualificationRequirementsEntities()) {
                Requirement qualiffRequir = new Requirement();
                qualiffRequir.setId(rtDutiesQualificationRequirementsEntity.getDcDutiesQualificationRequirementsId());
                qualiffRequir.setText(rtDutiesQualificationRequirementsEntity.getDcDutiesQualificationRequirementsEntity().getText());
                qualiffRequir.setPortionStartDate(rtDutiesQualificationRequirementsEntity.getDateStart());
                qualiffRequir.setPortionEndDate(rtDutiesQualificationRequirementsEntity.getDateEnd());

                qualiffRequirList.add(qualiffRequir);
            }
            dataInItem.setQualiffRequir(qualiffRequirList);

            itemById.setId(entity.getId());
            itemById.setData(dataInItem);

            itemsById.put(entity.getId(), itemById);
            itemsList.add(entity.getId());
        }

        FoundOccupations foundOccupations = new FoundOccupations();
        response.setFoundOccupations(foundOccupations);
        response.getFoundOccupations().setItemsList(itemsList);
        response.getFoundOccupations().setItemsById(itemsById);
        return response;
    }
}
