package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {

//    inject User service
    @Autowired
    private UserService userService;

//    retrieve form params
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public boolean authenticateUser(@RequestParam String username, @RequestParam String password){
        if (username != null &&password != null){
            return userService.authenticateUser(username, password);
        }else{
            return false;
        }

    }
}
