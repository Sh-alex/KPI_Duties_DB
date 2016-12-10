package com.kpi.kpi_duties_db.service.parser.impl;

import com.kpi.kpi_duties_db.domain.DcDutiesNameEntity;
import com.kpi.kpi_duties_db.domain.RtCodeEntity;
import com.kpi.kpi_duties_db.domain.RtDutiesEntity;
import com.kpi.kpi_duties_db.service.*;
import com.kpi.kpi_duties_db.service.parser.ParserXls;
import com.kpi.kpi_duties_db.service.parser.support.OccupationFromXls;
import com.kpi.kpi_duties_db.service.parser.support.converter.OccupationXlsConverter;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 04.12.2016
 */

@Component
public class ParserXlsImpl implements ParserXls {

    @Autowired
    private OccupationXlsConverter converter;

    @Autowired
    private RtDutiesService rtDutiesService;

    @Autowired
    private DutiesValidityDateService dutiesValidityDateService;

    @Autowired
    private RtCodeService rtCodeService;

    @Autowired
    private RtDutiesCodeService rtDutiesCodeService;

    @Autowired
    private DcDutiesNameService dcDutiesNameService;

    private final static Logger logger = LoggerFactory.getLogger(ParserXlsImpl.class);

    @Override
    public List<OccupationFromXls> parseXlsToOccupations() {

        HSSFWorkbook excelFile = null;
        try {
            FileInputStream s = new FileInputStream("D:\\Google Диск\\KPI\\посади\\для ЛП.xls");
            excelFile = new HSSFWorkbook(s);
        } catch (IOException e) {
            e.printStackTrace();
        }

        List<OccupationFromXls> resultList = new ArrayList<>();

        HSSFSheet sheet = excelFile.getSheetAt(1);

        Integer rowNumber = 2; //номер рядка в Excel

        for (int i = 1; i <= 12671; i++) {
            try {
                OccupationFromXls occupation = new OccupationFromXls();
                Row row = sheet.getRow(i);

                if (row.getCell(2) != null) {
                    row.getCell(2).setCellType(1);
                    occupation.setDuties(row.getCell(2).getStringCellValue());
                }

                if (row.getCell(3) != null) {
                    row.getCell(3).setCellType(1);
                    occupation.setClarification1(row.getCell(3).getStringCellValue());
                }
                if (row.getCell(4) != null) {
                    row.getCell(4).setCellType(1);
                    occupation.setClarification2(row.getCell(4).getStringCellValue());
                }
                if (row.getCell(5) != null) {
                    row.getCell(5).setCellType(1);
                    occupation.setClarification3(row.getCell(5).getStringCellValue());
                }
                if (row.getCell(6) != null) {
                    row.getCell(6).setCellType(1);
                    occupation.setClarification4(row.getCell(6).getStringCellValue());
                }
                if (row.getCell(1) != null) {
                    row.getCell(1).setCellType(1);
                    occupation.setClarificationCat(row.getCell(1).getStringCellValue());
                }

                if (row.getCell(7) != null) {
                    row.getCell(7).setCellType(1);
                    occupation.setName(row.getCell(7).getStringCellValue());
                }
                if (row.getCell(26) != null) {
                    row.getCell(26).setCellType(1);
                    occupation.setShortName(row.getCell(26).getStringCellValue());
                }

                if (row.getCell(8) != null) {
                    row.getCell(8).setCellType(1);
                    occupation.setPartition(row.getCell(8).getStringCellValue());
                }

                if (row.getCell(9) != null) {
                    row.getCell(9).setCellType(1);
                    occupation.setCodeKP(row.getCell(9).getStringCellValue());
                }
                if (row.getCell(10) != null) {
                    row.getCell(10).setCellType(1);
                    occupation.setCodeZkpptr(row.getCell(10).getStringCellValue());
                }
                if (row.getCell(11) != null) {
                    row.getCell(11).setCellType(1);
                    occupation.setCodeEtkd(row.getCell(11).getStringCellValue());
                }
                if (row.getCell(12) != null) {
                    row.getCell(12).setCellType(1);
                    occupation.setCodeDkhp(row.getCell(12).getStringCellValue());
                }

                if (row.getCell(25) != null) {
                    Date date = null;
                    row.getCell(25).setCellType(0);
                    switch ((int) row.getCell(25).getNumericCellValue()) {
                        case 2005:
                            date = new Date(1135555200000L); //26.12.2005
                            break;
                        case 2010:
                            date = new Date(1280275200000L); //28.07.2010
                            break;
                        case 2012:
                            date = new Date(1335139200000L); //23.04.2012
                            break;
                        case 2014:
                        case 2015:
                            date = new Date(1412121600000L); //01.10.2014
                            break;
                    }
                    occupation.setDate(date);
                }

                if (row.getCell(27) != null) {
                    row.getCell(27).setCellType(1);
                    if (row.getCell(27).getStringCellValue().equals("0"))
                        occupation.setKpi(true);
                    else
                        occupation.setKpi(false);
                }


                resultList.add(occupation);
                rowNumber++;

            } catch (Exception e) {
                logger.error("Помилка зчитування в рядку номер" + rowNumber);
            }
        }

        try {
            excelFile.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return resultList;
    }

    @Override
    @Transactional
    public void saveOccupationsToDB(List<OccupationFromXls> occupationsFromXls) {

        Integer number = 0;
        for (OccupationFromXls occupationFromXls : occupationsFromXls) {

            RtDutiesEntity entity = null;
            Integer parentId = null;
            for (int i = 0; i < 5; i++) {

                entity = converter.toRtDutiesEntityFromOccupationXls(occupationFromXls, i, parentId);

                if (entity == null)
                    break;

                RtDutiesEntity rtDutiesEntity = null;
                if (rtDutiesService.findByName(entity.getName()) != null) {
                    parentId = rtDutiesService.findByName(entity.getName()).getId();
                    continue;
                } else
                    rtDutiesEntity = rtDutiesService.add(entity);

                parentId = rtDutiesEntity.getId();
            }

            dutiesValidityDateService.add(converter.toDutiesValidityDateEntityListFromOccupationXls(occupationFromXls, parentId));

            List<RtCodeEntity> rtCode = rtCodeService.add(converter.toRtCodeEntityListFromOccupationXls(occupationFromXls));

            rtDutiesCodeService.add(parentId, rtCode);

            if (occupationFromXls.getClarificationCat() != null && !occupationFromXls.getClarificationCat().equals("")) {
                createCategoryForOccupation(parentId, occupationFromXls, occupationFromXls.getClarificationCat());
            }

            System.out.println("Saving to DB: " + number++);
        }
    }

    private void createCategoryForOccupation(Integer id, OccupationFromXls occupationFromXls, String clarificationCat) {

        List<String> catList = Arrays.asList("Провідний", "Головний", "1 категорії", "2 категорії", "3 категорії", "без категорії");
        List<String> rozList = Arrays.asList("1 розряду", "2 розряду", "3 розряду", "4 розряду", "5 розряду");
        List<String> stList = Arrays.asList("старший");

        List<String> clarificationList = null;

        RtDutiesEntity parentEntity = rtDutiesService.getById(id);


        switch (clarificationCat) {
            case "кат":
                clarificationList = catList;
                break;
            case "роз":
                clarificationList = rozList;
                break;
            case "ст":
                clarificationList = stList;
                break;
            default:
                return;
            /*case "клас":
                break;
            case "ранг":
                break;*/
        }

        for (int i = 0; i < clarificationList.size(); i++) {
            RtDutiesEntity rtDutiesEntity = new RtDutiesEntity();
            rtDutiesEntity.setDcDutiesPartitionId(parentEntity.getDcDutiesPartitionId());
            rtDutiesEntity.setName(parentEntity.getName());
            rtDutiesEntity.setNameShort(parentEntity.getNameShort());

            DcDutiesNameEntity entityClarification = new DcDutiesNameEntity();
            if (dcDutiesNameService.findByName(clarificationList.get(i)) == null) {
                entityClarification.setName(clarificationList.get(i));
                entityClarification = dcDutiesNameService.add(entityClarification);
            } else
                entityClarification = dcDutiesNameService.findByName(clarificationList.get(i));


            rtDutiesEntity.setParentId(id);
            rtDutiesEntity.setDcDutiesNameId(entityClarification.getId());

            if (clarificationCat.equals("кат") && i <= 1) {
                rtDutiesEntity.setName(clarificationList.get(i) + " " + parentEntity.getName());
            } else
                rtDutiesEntity.setName(parentEntity.getName() + " " + clarificationList.get(i));

            if (rtDutiesService.findByName(rtDutiesEntity.getName()) == null)
                rtDutiesEntity = rtDutiesService.add(rtDutiesEntity);
            else
                continue;

            dutiesValidityDateService.add(converter.toDutiesValidityDateEntityListFromOccupationXls(occupationFromXls, rtDutiesEntity.getId()));

            List<RtCodeEntity> rtCode = rtCodeService.add(converter.toRtCodeEntityListFromOccupationXls(occupationFromXls));

            rtDutiesCodeService.add(rtDutiesEntity.getId(), rtCode);

        }

    }
}
