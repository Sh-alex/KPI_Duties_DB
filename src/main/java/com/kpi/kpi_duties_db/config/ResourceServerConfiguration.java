package com.kpi.kpi_duties_db.config;


import com.kpi.kpi_duties_db.security.JsonToUrlEncodedAuthenticationFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;


/**
 * Created by on 29.01.16.
 *
 * @author David Steiman
 */
@Configuration
@EnableResourceServer
public class ResourceServerConfiguration extends ResourceServerConfigurerAdapter{
    Logger log = LoggerFactory.getLogger(ResourceServerConfiguration.class);

    @Autowired
    JsonToUrlEncodedAuthenticationFilter jsonFilter;

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .addFilterBefore(jsonFilter, ChannelProcessingFilter.class)
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/**").authenticated();
                //.antMatchers(HttpMethod.GET, "/foo").hasAuthority("FOO_READ");
                //.antMatchers(HttpMethod.POST, "/foo").hasAuthority("FOO_WRITE");
                //you can implement it like this, but I show method invocation security on write
    }


    @Override
    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
        log.info("Configuring ResourceServerSecurityConfigurer ");
        resources.resourceId("foo").tokenStore(tokenStore);
    }

    @Autowired
    TokenStore tokenStore;

    @Autowired
    JwtAccessTokenConverter tokenConverter;
}
