package com.kpi.kpi_duties_db.service.impl;


import com.kpi.kpi_duties_db.service.TokenParser;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.MalformedClaimException;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.jose4j.jwt.consumer.JwtConsumer;
import org.jose4j.jwt.consumer.JwtConsumerBuilder;
import org.jose4j.keys.RsaKeyUtil;
import org.jose4j.lang.JoseException;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;

/**
 * Created by Yaroslav on 20.11.2016.
 */
@Service
public class TokenParserImpl implements TokenParser {
    @Override
    public String getUsernameFromToken(String authHeader) throws JoseException, InvalidKeySpecException, InvalidJwtException, MalformedClaimException {

        String jwt = authHeader.substring("Bearer ".length());

        Resource resource = new ClassPathResource("public.cert");
        String publicKey = null;
        try {
            publicKey = new String(FileCopyUtils.copyToByteArray(resource.getInputStream()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        RsaKeyUtil rsaKeyUtil = new RsaKeyUtil();
        PublicKey pubKey = rsaKeyUtil.fromPemEncoded(publicKey);

        // create a JWT consumer
        JwtConsumer jwtConsumer = new JwtConsumerBuilder()
                .setRequireExpirationTime()
                .setVerificationKey(pubKey)
                .build();

        // validate and decode the jwt
        JwtClaims jwtDecoded = jwtConsumer.processToClaims(jwt);
        String username = jwtDecoded.getStringClaimValue("user_name");
        return username;
    }
}
