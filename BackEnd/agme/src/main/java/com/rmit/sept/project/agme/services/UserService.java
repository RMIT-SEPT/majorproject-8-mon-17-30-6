package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.Repositories.UserRepository;
import com.rmit.sept.project.agme.model.User;
import org.springframework.beans.factory.annotation.Autowired;
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

//    Retrieve list of users
    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        this.userRepository.findAll().forEach(users::add);
        return users;
    }
    public boolean authenticateUser(String username, String passwordHash){
//        Retrieve users
        List<User> users = getAllUsers();

//        work factor of bcrypt
        int strength = 10;

//        Interate through users to check if the usr matches the username
        for (User next:users){
            if (username == next.getUsername()){
//                If User is found, encode password with users salt
                SecureRandom salt = next.getSalt();
                BCryptPasswordEncoder bCryptPasswordEncoder =
                        new BCryptPasswordEncoder(strength, salt);
                String encodedPassword = bCryptPasswordEncoder.encode(passwordHash);

//                check if the passwords match, if so return true, else false
                if (next.getPassword() == encodedPassword){
                    return true;
                }else{
                    return false;
                }
            }
        }
        return false;
    }




}
