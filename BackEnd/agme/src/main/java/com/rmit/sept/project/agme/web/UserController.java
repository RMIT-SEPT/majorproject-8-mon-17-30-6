package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.services.UserService;
import org.omg.CORBA.DATA_CONVERSION;
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

    @PostMapping("/signup")
    public ResponseEntity<User> createdNewUser(@RequestBody User user){
        user.hashPassword();
        User user1 = userService.saveOrUpdateUser(user);
        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }
//    retrieve form params
    @PostMapping(value = "/login")
    public ResponseEntity<Boolean> authenticateUser(@RequestBody User user) {
        if (user.getUsername() != null && user.getPassword() != null) {
            if (userService.authenticateUser(user.getUsername(), user.getPassword())) {
                return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(Boolean.FALSE, HttpStatus.BAD_REQUEST);
            }

        }
        return new ResponseEntity<Boolean>(Boolean.FALSE, HttpStatus.BAD_REQUEST);

    }

}
