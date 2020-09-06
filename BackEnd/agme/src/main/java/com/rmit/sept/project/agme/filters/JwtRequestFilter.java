package com.rmit.sept.project.agme.filters;

import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.rmit.sept.project.agme.filters.AppConfig;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@EnableAutoConfiguration
@Import({AppConfig.class})
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private UserService userDetailsService;


    @Autowired
    private JwtUtil jwtUtil;
    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain)
            throws ServletException, IOException {
        final String authorisationHeader = httpServletRequest.getHeader("Authorisation");

        String username = null;
        String jwt;
//        ensure token is there and meets criteria
        if (authorisationHeader != null && authorisationHeader.startsWith("Bearer ")){
            jwt = authorisationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }
//        ensure details are valid
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null && userDetailsService.loadUserByUsername(username) != null){
//            load user
            User user = (User) this.userDetailsService.loadUserByUsername(username);
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
