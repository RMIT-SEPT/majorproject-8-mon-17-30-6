package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private static List<User> users = new ArrayList<>();
    static{
        users.add(new User("a", "ss", "sdf", "dsf", "fd"));
    }

    @Autowired
    private UserService userService;


    @GetMapping
    public String getAllUsers(Model model){
        model.addAttribute("users", users);
        return "users";
    }
}
