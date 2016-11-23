package com.kpi.kpi_duties_db.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.validation.Validation;
import javax.validation.Validator;


/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 26.08.2016
 */

@Configuration
public class AppConfig {


    private final String JERSEY_PATH  = "spring.jersey.application-path";

    @Autowired
    Environment environment;


    @Bean
    public Validator validator() {
        return Validation.buildDefaultValidatorFactory().getValidator();
    }

    public String getJerseyPath() {
        return environment.getProperty(JERSEY_PATH);
    }

}
