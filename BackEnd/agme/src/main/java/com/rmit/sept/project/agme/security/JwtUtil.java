package com.rmit.sept.project.agme.security;

import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.services.AdminService;
import com.rmit.sept.project.agme.services.CompanyService;
import com.rmit.sept.project.agme.services.EmployeeService;
import com.rmit.sept.project.agme.services.UserService;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtil {
    private final String SECRET_KEY = "agmekey";
    @Autowired
    UserService userService;
    @Autowired
    CompanyService companyService;
    @Autowired
    EmployeeService employeeService;

    @Autowired
    AdminService adminService;
//    Get username from a token
    public String extractUsername(String authorisationHeader){
        if (authorisationHeader != null && authorisationHeader.startsWith("Bearer ")){
            String jwtToken = authorisationHeader.substring(7);
            return extractClaim(jwtToken, Claims::getSubject);
        }
        return null;
    }

//    Gets exirpation date from a token
    public Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

//    gets a claim from a token
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        if (claims == null){
            return null;
        }
        return claimsResolver.apply(claims);
    }
// Extracts all claims from a token
    private Claims extractAllClaims(String token){
        try {
            return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            return null;
        }catch (SignatureException e) {
            return null;
        } catch(Exception e) {
            return null;
        }
        }

//        Checks if token is valid(expired or not)
    private Boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

//    Generates token
    public String generateToken(UserDetails user){
        Map<String, Object> claims = new HashMap<>();
//        Token generaated based on user type
        if (userService.loadUserByUsername(user.getUsername()) != null){
            claims.put("role", "USER");
        }else  if (companyService.loadUserByUsername(user.getUsername()) != null){
            claims.put("role", "COMPANY");
        }else  if (employeeService.loadUserByUsername(user.getUsername()) != null){
            claims.put("role", "EMPLOYEE");
        }else  if (adminService.loadUserByUsername(user.getUsername()) != null){
            claims.put("role", "ADMIN");
        }
        return createToken(claims, user.getUsername());
    }
// Creates a token based on claims
    private String createToken(Map<String, Object> claims, String subject){
        System.out.println(Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact());
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }
// Ensures token is valid
    public Boolean validateToken(String token, UserDetails user){
        final String username = extractUsername(token);
        return (username.equals(user.getUsername()) && !isTokenExpired(token));
    }

}
