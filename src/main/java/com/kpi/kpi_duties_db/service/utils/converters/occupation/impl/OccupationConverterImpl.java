package com.kpi.kpi_duties_db.service.utils.converters.occupation.impl;

import com.kpi.kpi_duties_db.domain.*;
import com.kpi.kpi_duties_db.service.*;
import com.kpi.kpi_duties_db.service.utils.converters.occupation.OccupationConverter;
import com.kpi.kpi_duties_db.shared.dto.occupation.OccupationGetDto;
import com.kpi.kpi_duties_db.shared.request.occupation.OccupationGetRequest;
import com.kpi.kpi_duties_db.shared.request.occupation.OccupationRequest;
import com.kpi.kpi_duties_db.shared.request.occupation.support.CodeOccupation;
import com.kpi.kpi_duties_db.shared.request.occupation.support.DurationOccupation;
import com.kpi.kpi_duties_db.shared.request.occupation.support.NameOccupation;
import com.kpi.kpi_duties_db.shared.request.occupation.support.RequirementsOccupation;
import com.kpi.kpi_duties_db.shared.response.occupation.OccupationsGetResponse;
import com.kpi.kpi_duties_db.shared.response.occupation.support.*;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.HibernateTemplate;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
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
    private DcDutiesTaskAndResponsibilitiesService dcDutiesTaskAndResponsibilitiesService;

    @Autowired
    private DcDutiesMustKnowService dcDutiesMustKnowService;

    @Autowired
    private DcDutiesQualificationRequirementsService dcDutiesQualificationRequirementsService;

    @Autowired
    private DcDutiesPartitionService dcDutiesPartitionService;

    @Autowired
    private DcDutiesNameService dcDutiesNameService;

    @Autowired
    private RtDutiesService rtDutiesService;

    @Autowired
    private RtDutiesTaskAndResponsibilitiesService rtDutiesTaskAndResponsibilitiesService;

    @Autowired
    private RtDutiesMustKnowService rtDutiesMustKnowService;

    @Autowired
    private RtDutiesQualificationRequirementsService rtDutiesQualificationRequirementsService;

    @Autowired
    private DutiesValidityDateService dutiesValidityDateService;

    @Autowired
    private RtDutiesCodeService rtDutiesCodeService;

    @Autowired
    private RtCodeService rtCodeService;

    @Autowired
    private HibernateTemplate hibernateTemplate;

    @Autowired
    private DcCodeDkhpService dcCodeDkhpService;

    @Autowired
    private DcCodeKpService dcCodeKpService;

    @Autowired
    private DcCodeEtkdService dcCodeEtkdService;

    @Autowired
    private DcCodeZkpptrService dcCodeZkpptrService;

    private final static Logger logger = LoggerFactory.getLogger(OccupationConverterImpl.class);

    @Override
    public RtDutiesEntity toRtDutiesEntityFromOccupationRequest(OccupationRequest request, Integer id) {

        RtDutiesEntity entity;
        //Визначаємо чи сутність створюється чи редагується
        if (id == null) {
            entity = new RtDutiesEntity();
        } else {
            entity = rtDutiesService.getById(id);
        }

        NameOccupation nameOccupation = request.getNameOccupation();

        entity.setDcDutiesPartitionId(nameOccupation.getDcDutiesPartitionId());

        entity.setParentId(nameOccupation.getParentId());

        entity.setName(nameOccupation.getRtDutiesName());
        entity.setNameShort(nameOccupation.getRtDutiesNameShort());

        entity.setDcDutiesNameId(nameOccupation.getDcDutiesNameId());

        entity.setDocumentName(nameOccupation.getDocumentName());
        entity.setDocumentUrl(nameOccupation.getDocumentUrl());
        entity.setDocumentTextsName(nameOccupation.getDocumentTextsName());
        entity.setDocumentTextsUrl(nameOccupation.getDocumentTextsUrl());

        return entity;
    }

    @Override
    public List<DutiesValidityDateEntity> toDutiesValidityDateEntityListFromOccupationRequest(OccupationRequest request, Integer rtDutiesId) {

        List<DutiesValidityDateEntity> list = new ArrayList<>();

        for (DurationOccupation date : request.getDurationOccupation()) {
            DutiesValidityDateEntity entity = new DutiesValidityDateEntity();

            entity.setId(date.getId());
            entity.setStart(date.getStart());
            entity.setStop(date.getStop());
            entity.setInKpi(date.getInKpi());
            entity.setVirtual(date.getVirtual());
            entity.setRtDutiesId(rtDutiesId);

            list.add(entity);
        }

        //Видаляю зайві, які було видалено при редагуванні
        List<Integer> idList = list.stream().map(item -> item.getId()).collect(Collectors.toList());//Всі id сутностей, які є для даної посади
        Set<DutiesValidityDateEntity> dutiesValidityDateEntities = rtDutiesService.getById(rtDutiesId).getDutiesValidityDateEntities();
        if (dutiesValidityDateEntities != null) {
            List<DutiesValidityDateEntity> deleteList = dutiesValidityDateEntities.stream().filter(item -> !idList.contains(item.getId())).collect(Collectors.toList());//Залишаю тільки ті, які були відправлені по API, а інші видаляю
            if (!deleteList.isEmpty()) {
                dutiesValidityDateService.delete(deleteList);
            }
        }

        return list;
    }


    @Override
    public List<RtCodeEntity> toRtCodeEntityListFromOccupationRequest(OccupationRequest request, Integer rtDutiesId) {

        List<CodeOccupation> codes = request.getCodes();

        List<RtCodeEntity> list = new ArrayList<>();
        for (CodeOccupation codeOccupation : codes) {
            RtCodeEntity entity = new RtCodeEntity();

            Integer id = codeOccupation.getId();
            if (id != null) {
                entity.setId(id);
            }
            entity.setCodeDKHPId(codeOccupation.getCodeDKHPId());
            entity.setCodeETKDId(codeOccupation.getCodeETDKId());
            entity.setCodeKPId(codeOccupation.getCodeKPId());
            entity.setCodeZKPPTRId(codeOccupation.getCodeZKPPTRId());
            entity.setDateStart(codeOccupation.getPortionStartDate());
            entity.setDateStop(codeOccupation.getPortionEndDate());

            if (codeOccupation.getCodeDKHPId() != null || codeOccupation.getCodeETDKId() != null || codeOccupation.getCodeKPId() != null || codeOccupation.getCodeZKPPTRId() != null) {
                list.add(entity);//Не створювати сутність якщо не передано жодного коду
            }
        }

        //Видаляю зайві зв'язки кодів, які були видалені при редагуванні
        List<Integer> idList = list.stream().map(item -> item.getId()).collect(Collectors.toList());//Всі id сутностей, які є для даної посади
        Set<RtDutiesCodeEntity> rtDutiesCodeEntities = rtDutiesService.getById(rtDutiesId).getRtDutiesCodeEntities();
        if (rtDutiesCodeEntities != null) {
            List<RtDutiesCodeEntity> deleteList = rtDutiesCodeEntities.stream().filter(item -> !idList.contains(item.getRtCodeId())).collect(Collectors.toList());//Знаходжу RtDutiesCodeEntity, які треба видалити
            List<RtCodeEntity> deleteCodeList = new ArrayList<>();//Знаходжу RtCodeEntity, які треба видалити
            deleteList.forEach(item -> {
                deleteCodeList.add(rtCodeService.getById(item.getRtCodeId()));
            });
            if (!deleteList.isEmpty()) {
                rtDutiesCodeService.delete(deleteList);
                rtCodeService.delete(deleteCodeList);
            }
        }

        return list;
    }

    @Override
    public List<RtDutiesTaskAndResponsibilitiesEntity> toRtDutiesTaskAndResponsibilitiesEntityListFromOccupationRequest(OccupationRequest request, Integer rtDutiesId) {

        List<RtDutiesTaskAndResponsibilitiesEntity> list = new ArrayList<>();

        List<RequirementsOccupation> responsibilities = request.getResponsibilities();

        for (RequirementsOccupation responsibility : responsibilities) {
            RtDutiesTaskAndResponsibilitiesEntity entity = new RtDutiesTaskAndResponsibilitiesEntity();

            if (responsibility.getIdText() == null && responsibility.getText() != null) {
                DcDutiesTasksAndResponsibilitiesEntity tasksAndResponsibilitiesEntity = new DcDutiesTasksAndResponsibilitiesEntity();
                tasksAndResponsibilitiesEntity.setText(responsibility.getText());
                DcDutiesTasksAndResponsibilitiesEntity addedEntity = dcDutiesTaskAndResponsibilitiesService.add(tasksAndResponsibilitiesEntity);
                entity.setDcDutiesTasksAndResponsibilitiesId(addedEntity.getId());
            } else {
                DcDutiesTasksAndResponsibilitiesEntity dcDutiesTasksAndResponsibilitiesEntity = dcDutiesTaskAndResponsibilitiesService.getById(responsibility.getIdText());
                dcDutiesTasksAndResponsibilitiesEntity.setText(responsibility.getText());
                dcDutiesTaskAndResponsibilitiesService.update(dcDutiesTasksAndResponsibilitiesEntity);
                entity.setDcDutiesTasksAndResponsibilitiesId(responsibility.getIdText());
            }


            entity.setId(responsibility.getIdDates());
            entity.setRtDutiesId(rtDutiesId);
            entity.setDateStart(responsibility.getDateStart());
            entity.setDateEnd(responsibility.getDateEnd());

            list.add(entity);
        }

        //Видаляю зайві, які було видалено при редагуванні
        List<Integer> idList = list.stream().map(item -> item.getId()).collect(Collectors.toList());//Всі id сутностей, які є для даної посади
        Set<RtDutiesTaskAndResponsibilitiesEntity> rtDutiesTaskAndResponsibilitiesEntities = rtDutiesService.getById(rtDutiesId).getRtDutiesTaskAndResponsibilitiesEntities();
        if (rtDutiesTaskAndResponsibilitiesEntities != null) {
            List<RtDutiesTaskAndResponsibilitiesEntity> deleteList = rtDutiesTaskAndResponsibilitiesEntities.stream().filter(item -> !idList.contains(item.getId())).collect(Collectors.toList());//Залишаю тільки ті, які були відправлені по API, а інші видаляю
            if (!deleteList.isEmpty()) {
                rtDutiesTaskAndResponsibilitiesService.delete(deleteList);
            }
        }
        return list;
    }

    @Override
    public List<RtDutiesMustKnowEntity> toRtDutiesMustKnowEntityListFromOccupationRequest(OccupationRequest request, Integer rtDutiesId) {
        List<RtDutiesMustKnowEntity> list = new ArrayList<>();

        List<RequirementsOccupation> responsibilities = request.getMustKnow();

        for (RequirementsOccupation responsibility : responsibilities) {
            RtDutiesMustKnowEntity entity = new RtDutiesMustKnowEntity();

            if (responsibility.getIdText() == null && responsibility.getText() != null) {
                DcDutiesMustKnowEntity dutiesMustKnowEntity = new DcDutiesMustKnowEntity();
                dutiesMustKnowEntity.setText(responsibility.getText());
                DcDutiesMustKnowEntity addedEntity = dcDutiesMustKnowService.add(dutiesMustKnowEntity);
                entity.setDcDutiesMustKnowId(addedEntity.getId());
            } else {
                DcDutiesMustKnowEntity dcDutiesMustKnowEntity = dcDutiesMustKnowService.getById(responsibility.getIdText());
                dcDutiesMustKnowEntity.setText(responsibility.getText());
                dcDutiesMustKnowService.update(dcDutiesMustKnowEntity);
                entity.setDcDutiesMustKnowId(responsibility.getIdText());
            }

            RtDutiesEntity rtDutiesEntity = new RtDutiesEntity();
            rtDutiesEntity.setId(rtDutiesId);

            entity.setId(responsibility.getIdDates());
            entity.setRtDutiesId(rtDutiesEntity.getId());
            entity.setDateStart(responsibility.getDateStart());
            entity.setDateEnd(responsibility.getDateEnd());

            list.add(entity);
        }

        //Видаляю зайві, які було видалено при редагуванні
        List<Integer> idList = list.stream().map(item -> item.getId()).collect(Collectors.toList());//Всі id сутностей, які є для даної посади
        Set<RtDutiesMustKnowEntity> rtDutiesMustKnowEntities = rtDutiesService.getById(rtDutiesId).getRtDutiesMustKnowEntities();
        if (rtDutiesMustKnowEntities != null) {
            List<RtDutiesMustKnowEntity> deleteList = rtDutiesMustKnowEntities.stream().filter(item -> !idList.contains(item.getId())).collect(Collectors.toList());//Залишаю тільки ті, які були відправлені по API, а інші видаляю

            if (!deleteList.isEmpty()) {
                rtDutiesMustKnowService.delete(deleteList);
            }
        }

        return list;
    }

    @Override
    public List<RtDutiesQualificationRequirementsEntity> toRtDutiesQualificationRequirementsEntityListFromOccupationRequest(OccupationRequest request, Integer rtDutiesId) {

        List<RtDutiesQualificationRequirementsEntity> list = new ArrayList<>();

        List<RequirementsOccupation> responsibilities = request.getQualificationRequirements();

        for (RequirementsOccupation responsibility : responsibilities) {
            RtDutiesQualificationRequirementsEntity entity = new RtDutiesQualificationRequirementsEntity();

            if (responsibility.getIdText() == null && responsibility.getText() != null) {
                DcDutiesQualificationRequirementsEntity requirementsEntity = new DcDutiesQualificationRequirementsEntity();
                requirementsEntity.setText(responsibility.getText());
                DcDutiesQualificationRequirementsEntity addedEntity = dcDutiesQualificationRequirementsService.add(requirementsEntity);
                entity.setDcDutiesQualificationRequirementsId(addedEntity.getId());
            } else {
                DcDutiesQualificationRequirementsEntity dcDutiesQualificationRequirementsEntity = dcDutiesQualificationRequirementsService.getById(responsibility.getIdText());
                dcDutiesQualificationRequirementsEntity.setText(responsibility.getText());
                dcDutiesQualificationRequirementsService.update(dcDutiesQualificationRequirementsEntity);
                entity.setDcDutiesQualificationRequirementsId(responsibility.getIdText());
            }

            RtDutiesEntity rtDutiesEntity = new RtDutiesEntity();
            rtDutiesEntity.setId(rtDutiesId);

            entity.setId(responsibility.getIdDates());
            entity.setRtDutiesId(rtDutiesEntity.getId());
            entity.setDateStart(responsibility.getDateStart());
            entity.setDateEnd(responsibility.getDateEnd());

            list.add(entity);
        }

        //Видаляю зайві, які було видалено при редагуванні
        List<Integer> idList = list.stream().map(item -> item.getId()).collect(Collectors.toList());//Всі id сутностей, які є для даної посади
        Set<RtDutiesQualificationRequirementsEntity> rtDutiesQualificationRequirementsEntities = rtDutiesService.getById(rtDutiesId).getRtDutiesQualificationRequirementsEntities();
        if (rtDutiesQualificationRequirementsEntities != null) {
            List<RtDutiesQualificationRequirementsEntity> deleteList = rtDutiesQualificationRequirementsEntities.stream().filter(item -> !idList.contains(item.getId())).collect(Collectors.toList());//Залишаю тільки ті, які були відправлені по API, а інші видаляю

            if (!deleteList.isEmpty()) {
                rtDutiesQualificationRequirementsService.delete(deleteList);
            }
        }

        return list;
    }

    @Override
    public OccupationGetDto toOccupationDtoFromOccupationGetRequest(OccupationGetRequest request) {
        if (request == null) {
            return null;
        }
        OccupationGetDto occupationGetDto = new OccupationGetDto();

        if (request.getIdList() != null && !request.getIdList().isEmpty()) {
            String[] split = request.getIdList().get(0).split(",");
            if (!split[0].equals("")) {
                List<String> list = new ArrayList<>(Arrays.asList(split));
                occupationGetDto.setIdList(new ArrayList<>());
                List<Integer> collect;
                try {
                    collect = list.stream().map(s -> Integer.parseInt(s)).collect(Collectors.toList());
                } catch (Exception e) {
                    String msg = "Illegal arguments in DcDutiesPartitionIdList. Must by array of integer";
                    logger.error(msg);
                    throw new IllegalArgumentException(msg);
                }
                for (Integer tag : collect) {
                    occupationGetDto.getIdList().add(tag);
                }
            }
        }

        if (request.getSearchType() != null && !request.getSearchType().isEmpty()) {
            occupationGetDto.setSearchType(request.getSearchType().get(0));
        }

        if (request.getRtDutiesName() != null && !request.getRtDutiesName().isEmpty()) {
            occupationGetDto.setRtDutiesName(request.getRtDutiesName().get(0));
        }
        if (request.getStartFrom() != null && !request.getStartFrom().isEmpty()) {
            occupationGetDto.setStartFrom(request.getStartFrom().get(0));
        }
        if (request.getStartTo() != null && !request.getStartTo().isEmpty()) {
            occupationGetDto.setStartTo(request.getStartTo().get(0));
        }
        if (request.getStopFrom() != null && !request.getStopFrom().isEmpty()) {
            occupationGetDto.setStopFrom(request.getStopFrom().get(0));
        }
        if (request.getStopTo() != null && !request.getStopTo().isEmpty()) {
            occupationGetDto.setStopTo(request.getStopTo().get(0));
        }
        if (request.getInKpi() != null && !request.getInKpi().isEmpty()) {
            occupationGetDto.setInKpi(request.getInKpi().get(0));
        }
        if (request.getOffset() != null && !request.getOffset().isEmpty()) {
            occupationGetDto.setOffset(request.getOffset().get(0));
        }
        if (request.getLimit() != null && !request.getLimit().isEmpty()) {
            occupationGetDto.setLimit(request.getLimit().get(0));
        }

        if (request.getDcDutiesPartitionIdList() != null && !request.getDcDutiesPartitionIdList().isEmpty()) {
            String[] split = request.getDcDutiesPartitionIdList().get(0).split(",");
            if (!split[0].equals("")) {
                List<String> list = new ArrayList<>(Arrays.asList(split));
                occupationGetDto.setDcDutiesPartitionIdList(new ArrayList<>());
                List<Integer> collect;
                try {
                    collect = list.stream().map(s -> Integer.parseInt(s)).collect(Collectors.toList());
                } catch (Exception e) {
                    String msg = "Illegal arguments in DcDutiesPartitionIdList. Must by array of integer";
                    logger.error(msg);
                    throw new IllegalArgumentException(msg);
                }
                for (Integer tag : collect) {
                    occupationGetDto.getDcDutiesPartitionIdList().add(tag);
                }
            }
        }


        if (request.getRtDutiesNameTags() != null && !request.getRtDutiesNameTags().isEmpty()) {
            String[] split = request.getRtDutiesNameTags().get(0).split(",");
            if (!split[0].equals("")) {
                occupationGetDto.setRtDutiesNameTags(new ArrayList<>());
                for (String tag : split) {
                    occupationGetDto.getRtDutiesNameTags().add(tag);
                }
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

        params.put("idList", dto.getIdList());
        params.put("searchType", dto.getSearchType());
        params.put("rtDutiesName", dto.getRtDutiesName());
        params.put("dcDutiesPartitionId", dto.getDcDutiesPartitionIdList());
        params.put("dcDutiesNames", dto.getRtDutiesNameTags());
        params.put("startFrom", dto.getStartFrom());
        params.put("startTo", dto.getStartTo());
        params.put("stopFrom", dto.getStopFrom());
        params.put("stopTo", dto.getStopTo());
        params.put("inKpi", dto.getInKpi());
        params.put("offset", dto.getOffset());
        params.put("limit", dto.getLimit());

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

            dataInItem.setRtDutiesName(entity.getName());
            dataInItem.setRtDutiesNameShort(entity.getNameShort());

            dataInItem.setDcDutiesPartitionId(entity.getDcDutiesPartitionId());

            dataInItem.setDcDutiesPartitionName(entity.getDcDutiesPartitionEntity().getName());

            dataInItem.setRtDutiesParentId(entity.getParentId());

            dataInItem.setDcDutiesNameId(entity.getDcDutiesNameId());

            dataInItem.setDocumentName(entity.getDocumentName());
            dataInItem.setDocumentUrl(entity.getDocumentUrl());
            dataInItem.setDocumentTextsName(entity.getDocumentTextsName());
            dataInItem.setDocumentTextsUrl(entity.getDocumentTextsUrl());

            dataInItem.setClarifications(createClarifications(entity));

            Set<DutiesValidityDateEntity> dutiesValidityDateEntities = entity.getDutiesValidityDateEntities();
            if (dutiesValidityDateEntities != null) {
                List<Duration> durations = new ArrayList<>();
                for (DutiesValidityDateEntity dutiesValidityDateEntity : dutiesValidityDateEntities) {
                    Duration duration = new Duration();

                    duration.setId(dutiesValidityDateEntity.getId());
                    duration.setStart(dutiesValidityDateEntity.getStart());
                    duration.setStop(dutiesValidityDateEntity.getStop());
                    duration.setInKpi(dutiesValidityDateEntity.getInKpi());
                    duration.setVirtual(dutiesValidityDateEntity.getVirtual());

                    durations.add(duration);
                }
                dataInItem.setDurations(durations);
            }


            List<CodesInData> codes = new ArrayList<>();
            for (RtDutiesCodeEntity rtDutiesCodeEntity : entity.getRtDutiesCodeEntities()) {

                RtCodeEntity rtCodeEntity = rtDutiesCodeEntity.getRtCodeEntity();

                if (rtCodeEntity != null) {
                    CodesInData codesInData = new CodesInData();
                    codesInData.setId(rtCodeEntity.getId());
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
                haveToKnow.setIdText(rtDutiesMustKnowEntity.getDcDutiesMustKnowId());
                haveToKnow.setText(rtDutiesMustKnowEntity.getDcDutiesMustKnowEntity().getText());

                haveToKnow.setIdDates(rtDutiesMustKnowEntity.getId());
                haveToKnow.setPortionStartDate(rtDutiesMustKnowEntity.getDateStart());
                haveToKnow.setPortionEndDate(rtDutiesMustKnowEntity.getDateEnd());

                //Знаходжу посади, в яких використовується даний текст крім поточної
                Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtDutiesMustKnowEntity.class);
                criteria.add(Restrictions.eq("dcDutiesMustKnowId", rtDutiesMustKnowEntity.getDcDutiesMustKnowId()));
                List<RtDutiesMustKnowEntity> usingText = criteria.list();
                List<Integer> rtDutiesIdList = usingText.stream().filter(item -> item.getRtDutiesId() != entity.getId()).map(item -> item.getRtDutiesId()).collect(Collectors.toList());
                List<String> rtDutiesNames = new ArrayList<>();
                rtDutiesIdList.forEach(item -> {
                    rtDutiesNames.add(rtDutiesService.getById(item).getName());
                });
                haveToKnow.setUsingOccupations(rtDutiesNames);

                haveToKnowList.add(haveToKnow);
            }
            dataInItem.setHaveToKnow(haveToKnowList);

            List<Requirement> responsibilitiesList = new ArrayList<>();
            for (RtDutiesTaskAndResponsibilitiesEntity rtDutiesTaskAndResponsibilitiesEntity : entity.getRtDutiesTaskAndResponsibilitiesEntities()) {
                Requirement responsibility = new Requirement();
                responsibility.setIdText(rtDutiesTaskAndResponsibilitiesEntity.getDcDutiesTasksAndResponsibilitiesId());
                responsibility.setText(rtDutiesTaskAndResponsibilitiesEntity.getDcDutiesTasksAndResponsibilitiesEntity().getText());

                responsibility.setIdDates(rtDutiesTaskAndResponsibilitiesEntity.getId());
                responsibility.setPortionStartDate(rtDutiesTaskAndResponsibilitiesEntity.getDateStart());
                responsibility.setPortionEndDate(rtDutiesTaskAndResponsibilitiesEntity.getDateEnd());

                //Знаходжу посади, в яких використовується даний текст крім поточної
                Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtDutiesTaskAndResponsibilitiesEntity.class);
                criteria.add(Restrictions.eq("dcDutiesTasksAndResponsibilitiesId", rtDutiesTaskAndResponsibilitiesEntity.getDcDutiesTasksAndResponsibilitiesId()));
                List<RtDutiesTaskAndResponsibilitiesEntity> usingText = criteria.list();
                List<Integer> rtDutiesIdList = usingText.stream().filter(item -> item.getRtDutiesId() != entity.getId()).map(item -> item.getRtDutiesId()).collect(Collectors.toList());
                List<String> rtDutiesNames = new ArrayList<>();
                rtDutiesIdList.forEach(item -> {
                    rtDutiesNames.add(rtDutiesService.getById(item).getName());
                });
                responsibility.setUsingOccupations(rtDutiesNames);

                responsibilitiesList.add(responsibility);
            }
            dataInItem.setResponsibilities(responsibilitiesList);

            List<Requirement> qualiffRequirList = new ArrayList<>();
            for (RtDutiesQualificationRequirementsEntity rtDutiesQualificationRequirementsEntity : entity.getRtDutiesQualificationRequirementsEntities()) {
                Requirement qualiffRequir = new Requirement();
                qualiffRequir.setIdText(rtDutiesQualificationRequirementsEntity.getDcDutiesQualificationRequirementsId());
                qualiffRequir.setText(rtDutiesQualificationRequirementsEntity.getDcDutiesQualificationRequirementsEntity().getText());

                qualiffRequir.setIdDates(rtDutiesQualificationRequirementsEntity.getId());
                qualiffRequir.setPortionStartDate(rtDutiesQualificationRequirementsEntity.getDateStart());
                qualiffRequir.setPortionEndDate(rtDutiesQualificationRequirementsEntity.getDateEnd());

                //Знаходжу посади, в яких використовується даний текст крім поточної
                Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtDutiesQualificationRequirementsEntity.class);
                criteria.add(Restrictions.eq("dcDutiesQualificationRequirementsId", rtDutiesQualificationRequirementsEntity.getDcDutiesQualificationRequirementsId()));
                List<RtDutiesQualificationRequirementsEntity> usingText = criteria.list();
                List<Integer> rtDutiesIdList = usingText.stream().filter(item -> item.getRtDutiesId() != entity.getId()).map(item -> item.getRtDutiesId()).collect(Collectors.toList());
                List<String> rtDutiesNames = new ArrayList<>();
                rtDutiesIdList.forEach(item -> {
                    rtDutiesNames.add(rtDutiesService.getById(item).getName());
                });
                qualiffRequir.setUsingOccupations(rtDutiesNames);

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

    private List<String> createClarifications(RtDutiesEntity entity) {
        List<String> clarifications = new ArrayList<>();

        if (entity.getParentEntity() == null) {
            clarifications.add(entity.getDcDutiesNameEntity().getName());
            return clarifications;
        }


        clarifications.addAll(createClarifications(entity.getParentEntity()));
        clarifications.add(entity.getDcDutiesNameEntity().getName());

        return clarifications;
    }

    @Override
    @Transactional
    public void deleteParentEntitiesWithoutChildren(RtDutiesEntity rtDutiesEntity) {

        List<DcCodeDkhpEntity> dkhpEntityList = new ArrayList<>();
        List<DcCodeEtkdEntity> etkdEntityList = new ArrayList<>();
        List<DcCodeKpEntity> kpEntityList = new ArrayList<>();
        List<DcCodeZkpptrEntity> zkpptrEntityList = new ArrayList<>();
        List<DcDutiesTasksAndResponsibilitiesEntity> tasksAndResponsibilitiesEntityList = new ArrayList<>();
        List<DcDutiesMustKnowEntity> mustKnowEntityList = new ArrayList<>();
        List<DcDutiesQualificationRequirementsEntity> qualificationRequirementsEntityList = new ArrayList<>();
        List<DcDutiesNameEntity> dutiesNameEntityList = new ArrayList<>();

        //Шукаю коди, які більше ніде не використовуються і видаляю
        for (RtDutiesCodeEntity rtDutiesCodeEntity : rtDutiesEntity.getRtDutiesCodeEntities()) {
            RtCodeEntity rtCodeEntity = rtDutiesCodeEntity.getRtCodeEntity();

            Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtCodeEntity.class);
            criteria.add(Restrictions.eq("codeDKHPId", rtCodeEntity.getCodeDKHPId()));
            if (criteria.list().size() == 1 && rtCodeEntity.getCodeDKHPId() != null) {
                dkhpEntityList.add(rtCodeEntity.getCodeDkhpEntity());
            }
            criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtCodeEntity.class);
            criteria.add(Restrictions.eq("codeETKDId", rtCodeEntity.getCodeETKDId()));
            if (criteria.list().size() == 1 && rtCodeEntity.getCodeETKDId() != null) {
                etkdEntityList.add(rtCodeEntity.getCodeEtkdEntity());
            }
            criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtCodeEntity.class);
            criteria.add(Restrictions.eq("codeKPId", rtCodeEntity.getCodeKPId()));
            if (criteria.list().size() == 1 && rtCodeEntity.getCodeKPId() != null) {
                kpEntityList.add(rtCodeEntity.getCodeKpEntity());
            }
            criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtCodeEntity.class);
            criteria.add(Restrictions.eq("codeZKPPTRId", rtCodeEntity.getCodeZKPPTRId()));
            if (criteria.list().size() == 1 && rtCodeEntity.getCodeZKPPTRId() != null) {
                zkpptrEntityList.add(rtCodeEntity.getCodeZkpptrEntity());
            }
        }

        //Шукаю тексти, які більше ніде не використовуються і видаляю
        for (RtDutiesTaskAndResponsibilitiesEntity rtDutiesTaskAndResponsibilitiesEntity : rtDutiesEntity.getRtDutiesTaskAndResponsibilitiesEntities()) {
            Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtDutiesTaskAndResponsibilitiesEntity.class);
            criteria.add(Restrictions.eq("dcDutiesTasksAndResponsibilitiesId", rtDutiesTaskAndResponsibilitiesEntity.getDcDutiesTasksAndResponsibilitiesId()));
            if (criteria.list().size() == 1) {
                tasksAndResponsibilitiesEntityList.add(rtDutiesTaskAndResponsibilitiesEntity.getDcDutiesTasksAndResponsibilitiesEntity());
            }
        }
        for (RtDutiesMustKnowEntity rtDutiesMustKnowEntity : rtDutiesEntity.getRtDutiesMustKnowEntities()) {
            Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtDutiesMustKnowEntity.class);
            criteria.add(Restrictions.eq("dcDutiesMustKnowId", rtDutiesMustKnowEntity.getDcDutiesMustKnowId()));
            if (criteria.list().size() == 1) {
                mustKnowEntityList.add(rtDutiesMustKnowEntity.getDcDutiesMustKnowEntity());
            }
        }
        for (RtDutiesQualificationRequirementsEntity qualificationRequirementsEntity : rtDutiesEntity.getRtDutiesQualificationRequirementsEntities()) {
            Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtDutiesQualificationRequirementsEntity.class);
            criteria.add(Restrictions.eq("dcDutiesQualificationRequirementsId", qualificationRequirementsEntity.getDcDutiesQualificationRequirementsId()));
            if (criteria.list().size() == 1) {
                qualificationRequirementsEntityList.add(qualificationRequirementsEntity.getDcDutiesQualificationRequirementsEntity());
            }
        }

        //Шукаю уточнення, які більше ніде не використовуються і видаляю
        Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(RtDutiesEntity.class);
        criteria.add(Restrictions.eq("dcDutiesNameId", rtDutiesEntity.getDcDutiesNameId()));
        if (criteria.list().size() == 1 && rtDutiesEntity.getDcDutiesNameId() != null) {
            dutiesNameEntityList.add(rtDutiesEntity.getDcDutiesNameEntity());
        }


        rtDutiesService.delete(rtDutiesEntity.getId());
        dcCodeDkhpService.delete(dkhpEntityList);
        dcCodeEtkdService.delete(etkdEntityList);
        dcCodeKpService.delete(kpEntityList);
        dcCodeZkpptrService.delete(zkpptrEntityList);
        dcDutiesTaskAndResponsibilitiesService.delete(tasksAndResponsibilitiesEntityList);
        dcDutiesMustKnowService.delete(mustKnowEntityList);
        dcDutiesQualificationRequirementsService.delete(qualificationRequirementsEntityList);
        dcDutiesNameService.delete(dutiesNameEntityList);

    }
}
