package com.kpi.kpi_duties_db.config;

import com.kpi.kpi_duties_db.domain.Permissions;
import com.kpi.kpi_duties_db.repository.PermissionsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import javax.servlet.http.HttpServletResponse;

import static java.util.Arrays.asList;

/**
 * Created by on 28.01.16.
 *
 * @author David Steiman
 */
@Configuration
class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    Logger log = LoggerFactory.getLogger(WebSecurityConfig.class);

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
//
//    @Autowired
//    private PermissionsRepository employeeRepository;

//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth
//                .userDetailsService(username -> {
//                            Permissions employee = employeeRepository.loadUserByUsername(username);
//                            if (employee == null) {
//                                throw new BadCredentialsException("User not found");
//                            }
//                            return new User(username, employee.getPassword(), asList(new SimpleGrantedAuthority("ROLE_USER")));
////                            return new User("admin", "123", asList(new SimpleGrantedAuthority("ROLE_USER")));
//                        }
//
//                );
//    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
                .exceptionHandling()
                .authenticationEntryPoint((request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED))
            .and()
                .authorizeRequests()
                .antMatchers("/**").authenticated()
            .and()
                .formLogin()
                .loginPage("/oauth/token")
                .usernameParameter("login")
                .passwordParameter("password")
                .and()
                .httpBasic();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("admin")
                .password("123")
                .authorities("FOO_READ")
                .and()
                .withUser("reader")
                .password("123")
                .authorities("FOO_READ", "FOO_WRITE")
                .and()
                .withUser("editor")
                .password("123")
                .authorities("FOO_READ", "FOO_WRITE");
    }
}
