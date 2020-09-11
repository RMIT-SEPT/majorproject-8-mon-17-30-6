package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.services.UserService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import static com.rmit.sept.project.agme.model.Role.ADMIN;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UserServiceTest {


    @TestConfiguration
    static class UserServiceTestConfiguration {

        @Bean
        public UserService userService() {
            return new UserService();
        }
    }
    @Autowired
    UserRepository userRepository;

    @Test
    public void myTest() throws Exception {
        User user = new User();
        user.setName("test user");
        user.setUsername("alex");
        user.setPhone("00");
        user.setAddress("addy");
        user.setConfirmPassword("password");
        user.setName("name");
        user.setRole(ADMIN);
        user.setPassword("password");
        Long id = new Long(1);
        user.setId(id);
        User user2 = userRepository.save(user);
        java.util.Optional<User> userFound = userRepository.findById(id);
        Assert.assertEquals(user2, userFound.get());
    }
}
