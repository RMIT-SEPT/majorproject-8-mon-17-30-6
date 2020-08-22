package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {
//
//    inject User service
    @Autowired
    private UserService userService;

//    retrieve form params
    @PostMapping("/login")
    public ResponseEntity<Boolean> authenticateUser(@RequestParam String username, @RequestParam String password) {
        if (username != null && password != null) {
            if (userService.authenticateUser(username, password)) {
                return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(Boolean.FALSE, HttpStatus.BAD_REQUEST);
            }

        }
        return new ResponseEntity<Boolean>(Boolean.FALSE, HttpStatus.BAD_REQUEST);

    }

}
