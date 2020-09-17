package com.rmit.sept.project.agme.services;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserInterface {
    //injecting user repository access

    void saveOrUpdate(UserDetails user);

    //    Retrieve list of users
    List<?> getAll();



    UserDetails loadUserByUsername(String s);
    boolean authenticateUser(String username, String passwordHash);

    }
