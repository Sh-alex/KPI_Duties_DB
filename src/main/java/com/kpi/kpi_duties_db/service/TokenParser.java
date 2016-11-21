package com.kpi.kpi_duties_db.service;

import org.jose4j.jwt.MalformedClaimException;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.jose4j.lang.JoseException;

import java.security.spec.InvalidKeySpecException;

/**
 * Created by Yaroslav on 20.11.2016.
 */
public interface TokenParser {

    String getUsernameFromToken(String authHeader) throws JoseException, InvalidKeySpecException, InvalidJwtException, MalformedClaimException;

    }


