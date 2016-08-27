package com.kpi.kpi_duties_db.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;

import javax.validation.Validation;
import javax.validation.Validator;


@Configuration
public class AppConfig {


    private final String JERSEY_PATH  = "spring.jersey.application-path";

    @Autowired
    Environment environment;


    @Bean
    public Validator validator() {
        return Validation.buildDefaultValidatorFactory().getValidator();
    }

    @Bean
    public TextEncryptor textEncryptor() {
        return Encryptors.noOpText();
    }

    public String getJerseyPath() {
        return environment.getProperty(JERSEY_PATH);
    }

}
