package com.kpi.kpi_duties_db.config;


import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 14.09.2016
 */
public class BaseCORSFilter {

    private static final Set<String> EMPTY = new HashSet<>();

    private Set<String> parseAllowedOrigins(String allowedOriginsString) {
        if(!StringUtils.isEmpty(allowedOriginsString)) {
            return new HashSet<>(Arrays.asList(allowedOriginsString.split(",")));
        } else {
            return EMPTY;
        }

    }

    public Set<String> getAllowedOrigins(String allowedOriginsString) {
        return parseAllowedOrigins(allowedOriginsString);
    }
}
