package com.rmit.sept.project.agme.filters;

import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.LoginSignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@EnableAutoConfiguration
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private LoginSignupService loginSignupService;


    @Autowired
    private JwtUtil jwtUtil;
    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain)
            throws ServletException, IOException {
        final String authorisationHeader = httpServletRequest.getHeader("Authorisation");

        String username = jwtUtil.extractUsername(authorisationHeader);
//        ensure details are valid
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null && loginSignupService.loadUserByUsername(username) != null){
//            load user
            UserDetails user = loginSignupService.loadUserByUsername(username);

            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                    user, null, user.getAuthorities());
//            set authorities
            usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource()
            .buildDetails(httpServletRequest));
            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
