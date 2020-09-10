package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.ArrayList;
import java.util.List;

public interface UserInterface {
    //injecting user repository access

    public abstract UserDetails saveOrUpdate(UserDetails user);

    //    Retrieve list of users
    abstract public List<?> getAll();



    public UserDetails loadUserByUsername(String s);
}
