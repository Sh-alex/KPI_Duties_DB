package com.kpi.kpi_duties_db.service.parser.support.converter.impl;

import com.kpi.kpi_duties_db.domain.DcDutiesNameEntity;
import com.kpi.kpi_duties_db.domain.RtDutiesEntity;
import com.kpi.kpi_duties_db.service.DcDutiesNameService;
import com.kpi.kpi_duties_db.service.parser.support.OccupationFromXls;
import com.kpi.kpi_duties_db.service.parser.support.converter.OccupationXlsConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 10.12.2016
 */

@Component
public class OccupationXlsConverterImpl implements OccupationXlsConverter {

    @Autowired
    DcDutiesNameService dcDutiesNameService;

    @Override
    @Transactional
    public RtDutiesEntity toRtDutiesEntityFromOccupationXls(OccupationFromXls occupationFromXls, Integer clarification, Integer parentId) {

        DcDutiesNameEntity entityClarification = new DcDutiesNameEntity();
        String entityName = getClarificationName(occupationFromXls, clarification);

        //Якщо це посада останнього рівня в ієрархії
        if (entityName == null || entityName.equals(""))
            return null;

        if (dcDutiesNameService.findByName(entityName) == null) {
            entityClarification.setName(entityName);
            entityClarification = dcDutiesNameService.add(entityClarification);
        } else
            entityClarification = dcDutiesNameService.findByName(entityName);


        RtDutiesEntity entity = new RtDutiesEntity();

        entity.setDcDutiesNameId(entityClarification.getId());

        entity.setDcDutiesPartitionId(getPartitionIdByName(occupationFromXls.getPartition()));

        if (parentId != null) {
            entity.setParentId(parentId);
        }

        //Якщо це посада останнього рівня в ієрархії
        entityName = getClarificationName(occupationFromXls, clarification + 1);
        if (entityName == null || entityName.equals("") || clarification + 1 == 5) {
            entity.setName(occupationFromXls.getName());
            entity.setNameShort(occupationFromXls.getShortName());
        } else {
            String name = createNameByClarifications(occupationFromXls, clarification);
            entity.setName(name);
            entity.setNameShort(name);
        }

        return entity;
    }

    private Integer getPartitionIdByName(String name) {

        Integer id = null;
        switch (name) {

            case "керівники":
                id = 1;
                break;
            case "професіонали":
                id = 2;
                break;
            case "фахівці":
                id = 3;
                break;
            case "технічні службовці":
                id = 4;
                break;
            case "працівники сфери торгівлі та послуг":
                id = 5;
                break;
            case "кваліфікаційні робітники":
                id = 6;
                break;
            case "кваліфікаційні робітники з інструментом":
                id = 7;
                break;
            case "робітники з обслуговування":
                id = 8;
                break;
            case "найпростіші професії":
                id = 9;
                break;
        }

        return id;
    }

    private String getClarificationName(OccupationFromXls occupationFromXls, Integer clarificationNumber) {

        String clarificationName = null;
        switch (clarificationNumber) {

            case 0:
                clarificationName = occupationFromXls.getDuties();
                break;
            case 1:
                clarificationName = occupationFromXls.getClarification1();
                break;
            case 2:
                clarificationName = occupationFromXls.getClarification2();
                break;
            case 3:
                clarificationName = occupationFromXls.getClarification3();
                break;
            case 4:
                clarificationName = occupationFromXls.getClarification4();
                break;
        }

        return clarificationName;
    }

    private String createNameByClarifications(OccupationFromXls occupationFromXls, Integer clarification) {
        String name = null;
        switch (clarification) {
            case 0:
                name = occupationFromXls.getDuties();
                break;
            case 1:
                name = occupationFromXls.getDuties() + " " + occupationFromXls.getClarification1();
                break;
            case 2:
                name = occupationFromXls.getDuties() + " " + occupationFromXls.getClarification1() + " " + occupationFromXls.getClarification2();
                break;
            case 3:
                name = occupationFromXls.getDuties() + " " + occupationFromXls.getClarification1() + " " + occupationFromXls.getClarification2() + " " + occupationFromXls.getClarification3();
                break;
            case 4:
                name = occupationFromXls.getDuties() + " " + occupationFromXls.getClarification1() + " " + occupationFromXls.getClarification2() + " " + occupationFromXls.getClarification3() + " " + occupationFromXls.getClarification4();
                break;
        }

        return name;
    }
}
