package com.rmit.sept.project.agme.security;

import com.rmit.sept.project.agme.filters.JwtRequestFilter;
import com.rmit.sept.project.agme.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class SecurityConfigurer extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserService userDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    protected void configure(HttpSecurity http) throws Exception {
        http.cors();

//        Allows access to db
//        sets restriction on api endpoints for user type
        http.authorizeRequests().antMatchers("/h2-console/**").permitAll();
        http.headers().frameOptions().sameOrigin();
//        Ensures correct authority for each api
        http.authorizeRequests().antMatchers("/admin").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("/company").hasAnyAuthority("COMPANY");
        http.authorizeRequests().antMatchers("/employee").hasAnyAuthority("EMPLOYEE");
        http.authorizeRequests().antMatchers("/user").hasAnyAuthority("USER");
//        removes restriction on access to sign and login
        http.csrf().disable()
                .authorizeRequests().antMatchers("/login", "/signup", "/h2-console", "/healthcheck")
                .permitAll().anyRequest().authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//        Ensures correct user ttype is accessing the api
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}