package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    //injecting user repository access
    @Autowired
    private UserRepository userRepository;

    public UserService() {

    }

    public User saveOrUpdateUser(User user) {

        return userRepository.save(user);
    }

    //    Retrieve list of users
    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        Iterable<User> aa = userRepository.findAll();
        aa.forEach(users::add);
        return users;
    }

    public boolean authenticateUser(String username, String passwordHash) {
//        Retrieve users
        List<User> users = getAllUsers();
//        Interate through users to check if the usr matches the username
        for (User next : users) {
            if (username.equals(next.getUsername())) {
//                If User is found, encode password with users salt
//                check if the passwords match, if so return true, else false
//                if (passwordEncoder.matches(passwordHash, next.getPassword())){
                if (BCrypt.checkpw(passwordHash, next.getPassword())) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    }


    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
//        Retrieve users
        List<User> users = getAllUsers();
        User returnVal = null;
        s = s.toLowerCase();

//        Interate through users to check if the usr matches the username
        for (User next : users) {
            if (s.equals(next.getUsername())) {
                returnVal = next;
            }
        }
        return returnVal;
    }
}
