package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.Repositories.UserRepository;
import com.rmit.sept.project.agme.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User saveOrUpdateUser(User user){
        return userRepository.save(user);
    }
}
