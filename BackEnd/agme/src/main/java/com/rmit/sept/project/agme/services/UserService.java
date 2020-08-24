package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.Repositories.UserRepository;
import com.rmit.sept.project.agme.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class UserService {
    private UserRepository userRepository;

    //injecting user repository access
    @Autowired
    public UserService(UserRepository userRepository){
        super();
        this.userRepository = userRepository;
    }

    public User saveOrUpdateUser(User user){
        return userRepository.save(user);
    }

//    Retrieve list of users
    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        this.userRepository.findAll().forEach(users::add);
        return users;
    }
    public boolean authenticateUser(String username, String passwordHash){
//        Retrieve users
        List<User> users = getAllUsers();

//        Interate through users to check if the usr matches the username
        for (User next:users){
            if (username.equals(next.getUsername())){
//                If User is found, encode password with users salt
//                check if the passwords match, if so return true, else false
//                if (passwordEncoder.matches(passwordHash, next.getPassword())){
                if (BCrypt.checkpw(passwordHash, next.getPassword()))    {
                return true;
                }else{
                    return false;
                }
            }
        }
        return false;
    }
    public User getAuthenticatedUser(String username){
//        Retrieve users
        List<User> users = getAllUsers();
        User returnVal = null;

//        Interate through users to check if the usr matches the username
        for (User next:users){
            if (username.equals(next.getUsername())){
                returnVal = next;
            }
            }
        return returnVal;
    }





    }
