package com.rmit.sept.project.agme.service;

import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.services.UserService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import javax.validation.ConstraintViolationException;
import javax.xml.bind.ValidationException;

import java.util.ArrayList;
import java.util.List;

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

    @Autowired
    UserService userService;

    @Test
    public void loadUser_shouldReturnTrue_WithfindbyId() throws Exception {
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
        User userFound = (User)userService.loadUserByUsername(user.getUsername());
        Assert.assertEquals(user2, userFound);
    }
    @Rule
    public ExpectedException exceptionRule = ExpectedException.none();

    @Test
    public void createNewUser_shouldThrowException_WithIncompleteFields() throws Exception {
        User user = new User();
        user.setName("test user");
        user.setUsername("alex");
        user.setConfirmPassword("password");
        user.setRole(ADMIN);
        user.setPassword("password");
        Long id = new Long(1);
        user.setId(id);
        exceptionRule.expect(ConstraintViolationException.class);
        User user2 = userService.saveOrUpdateUser(user);
    }
    @Test
    public void createNewUser_shouldThrowException_whenPasswordsDoNotMatch() throws Exception {
        User user = new User();
        user.setName("test user");
        user.setUsername("alex");
        user.setConfirmPassword("pasdsword");
        user.setRole(ADMIN);
        user.setPassword("password");
        Long id = new Long(1);
        user.setId(id);
        exceptionRule.expect(ConstraintViolationException.class);
        User user2 = userService.saveOrUpdateUser(user);
    }
    @Test
    public void getAll_shouldReturnAList_whenCalled() throws Exception {
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
        List<User> users = new ArrayList<User>();
        users.add(user);
        List<User> usersFound = userService.getAllUsers();
        Assert.assertEquals(usersFound.size(), users.size());
    }
    @Test
    public void authenticateUser_shouldReturnTrue_whenDetailsMatch() throws Exception {
        User user = new User();
        user.setName("test user");
        user.setUsername("alex");
        user.setPhone("00");
        user.setAddress("addy");
        user.setConfirmPassword("password");
        user.setName("name");
        user.setRole(ADMIN);
        user.setPassword("password");
        user.hashPassword();
        Long id = new Long(1);
        user.setId(id);
        User user2 = userRepository.save(user);
        Assert.assertTrue(userService.authenticateUser(user.getUsername(),"password"));
    }
    @Test
    public void authenticateUser_shouldReturnFalse_whenDetailsDontMatch() throws Exception {
        User user = new User();
        user.setName("test user");
        user.setUsername("alex");
        user.setPhone("00");
        user.setAddress("addy");
        user.setConfirmPassword("password");
        user.setName("name");
        user.setRole(ADMIN);
        user.setPassword("password");
        user.hashPassword();
        Long id = new Long(1);
        user.setId(id);
        User user2 = userRepository.save(user);
        Assert.assertFalse(userService.authenticateUser(user.getUsername(),"npassword"));
    }
    @Test
    public void authenticateUser_shouldThrowNullPointerException_whenNoUsernameAndPasswordAtGiven() throws Exception {
        User user = new User();
        user.setName("test user");
        user.setUsername("alex");
        user.setPhone("00");
        user.setAddress("addy");
        user.setConfirmPassword("password");
        user.setName("name");
        user.setRole(ADMIN);
        user.setPassword("password");
        user.hashPassword();
        Long id = new Long(1);
        user.setId(id);
        User user2 = userRepository.save(user);
        exceptionRule.expect(NullPointerException.class);
        userService.authenticateUser(null,null);

    }




}
