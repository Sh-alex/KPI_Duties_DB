package com.kpi.kpi_duties_db.config;



import org.glassfish.jersey.filter.LoggingFilter;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.spring.scope.RequestContextFilter;
import org.glassfish.jersey.servlet.ServletContainer;
import org.springframework.boot.autoconfigure.jersey.JerseyProperties;
import org.springframework.boot.context.embedded.RegistrationBean;
import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;


@Configuration
public class JerseyConfig extends ResourceConfig {

    public JerseyConfig() {
        register(RequestContextFilter.class);
        packages("com.kpi.kpi_duties_db.rest");
        register(LoggingFilter.class);
    }

    @Bean
    public ServletRegistrationBean jerseyServletRegistration(JerseyProperties jerseyProperties, ResourceConfig config) {
        ServletRegistrationBean registration = new ServletRegistrationBean(
                new ServletContainer(config),
                parseApplicationPath(jerseyProperties.getApplicationPath())
        );
        addInitParameters(registration, jerseyProperties);
        registration.setName(JerseyConfig.class.getName());
        registration.setLoadOnStartup(1);
        return registration;
    }

    private static String parseApplicationPath(String applicationPath) {
        if (!applicationPath.startsWith("/")) {
            applicationPath = "/" + applicationPath;
        }
        return applicationPath.equals("/") ? "/*" : applicationPath + "/*";
    }

    private void addInitParameters(RegistrationBean registration, JerseyProperties jersey) {
        for (Map.Entry<String, String> entry : jersey.getInit().entrySet()) {
            registration.addInitParameter(entry.getKey(), entry.getValue());
        }

    }



}