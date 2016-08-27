package com.kpi.kpi_duties_db;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication(scanBasePackages = {"com.kpi.kpi_duties_db"})
@EnableTransactionManagement
public class KpiDutiesApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(KpiDutiesApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(KpiDutiesApplication.class);
    }
}
