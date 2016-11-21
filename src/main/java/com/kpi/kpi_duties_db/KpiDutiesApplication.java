package com.kpi.kpi_duties_db;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;


@EnableAutoConfiguration
@SpringBootApplication
public class KpiDutiesApplication {

	public static void main(String[] args) {

		new SpringApplicationBuilder(KpiDutiesApplication.class).run(args);
	}
}


