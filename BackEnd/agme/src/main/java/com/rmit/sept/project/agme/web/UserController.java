package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.AuthenticationRequest;
import com.rmit.sept.project.agme.model.AuthenticationResponse;
import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.UserService;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.xml.transform.ErrorListener;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("")
@CrossOrigin("http://localhost:3000")
public class UserController {
//
//    inject User service
    @Autowired
    private UserService userService;

//    signup authentication
    @PostMapping("/signup")
    public ResponseEntity<?> createdNewUser(@Valid @RequestBody User user, BindingResult result) {
//        makes sure passwords are confirmed\			fieldErrors.put(error.getField(), error.getDefaultMessage());
        if (result.hasErrors()){
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error: result.getFieldErrors()){
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);

        }

//        add validation to ensure user does not exist and all details are filled out
        if (userService.loadUserByUsername(user.getUsername()) == null) {

            if (user.getPassword().equals(user.getConfirmPassword())) {

//            hash the password before storing
                user.hashPassword();
//            store user with hashed password
                User user1 = userService.saveOrUpdateUser(user);
//            if signup is succesful, return he user
                return new ResponseEntity<User>(user, HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.BAD_REQUEST);
            }
        }else{
            return ResponseEntity.badRequest().body("username is taken");
        }
    }

//    retrieve form params
//    @PostMapping(value = "/login")
//    public ResponseEntity<?> authenticateUser(@RequestBody User user) {
////        ensures
//        if (user.getUsername() != null && user.getPassword() != null) {
//            if (userService.authenticateUser(user.getUsername(), user.getPassword())) {
//                User user1 = userService.getAuthenticatedUser(user.getUsername());
//                return new ResponseEntity<User>(user1, HttpStatus.OK);
//            } else {
//                return new ResponseEntity<Boolean>(Boolean.FALSE, HttpStatus.BAD_REQUEST);
//            }
//
//        }
//        return new ResponseEntity<Boolean>(Boolean.FALSE, HttpStatus.BAD_REQUEST);
//
//    }

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    JwtUtil jwtUtil;
    @PostMapping(value = "/login")
    public ResponseEntity<?> createAuthenticationRequest(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        //        if (user.getUsername() != null && user.getPassword() != null) {
        if (userService.authenticateUser(authenticationRequest.getUsername(), authenticationRequest.getPassword())) {
            final UserDetails user = userService.loadUserByUsername(
                    authenticationRequest.getUsername());
            final String jwt = jwtUtil.generateToken((User) user);
            return ResponseEntity.ok(new AuthenticationResponse(jwt));
        }else{
            return ResponseEntity.badRequest().body("Invalid username and password");

        }

    }
}
