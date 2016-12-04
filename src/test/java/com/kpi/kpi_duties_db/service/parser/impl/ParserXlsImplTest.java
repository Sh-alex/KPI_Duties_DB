package com.kpi.kpi_duties_db.service.parser.impl;

import com.kpi.kpi_duties_db.KpiDutiesApplication;
import com.kpi.kpi_duties_db.service.parser.ParserXls;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = KpiDutiesApplication.class)
@WebAppConfiguration
public class ParserXlsImplTest {

    @Autowired
    private ParserXls parserXls;

    @Test
    public void parseXlsToOccupations() throws Exception {

        parserXls.parseXlsToOccupations();
    }

}