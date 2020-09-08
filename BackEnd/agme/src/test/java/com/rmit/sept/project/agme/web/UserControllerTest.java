package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.UserService;
import net.minidev.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.HashMap;

import static com.rmit.sept.project.agme.model.Role.ADMIN;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(UserController.class)
public class UserControllerTest {
    @TestConfiguration
    static class UserServiceTestConfiguration {

        @Bean
        public UserService userService() {
            return new UserService();
        }
    }
    @Autowired
    MockMvc mvc;

    @MockBean
    UserRepository userRepository;

    @MockBean
    JwtUtil jwtUtil;

    @Autowired
    UserService userService;

    @Autowired
    UserController userController;

    @Test
    public void shouldReturnHTTPStatus400_whenCreatingUserWithIncompleteFields() throws Exception {
        HashMap<String, Object> ob = new HashMap<String, Object>();
        ob.put("name", "mark");
        ob.put("username", "user");
        ob.put("address", "user");
        ob.put("password", "password");
        ob.put("confirmPassword", "password");
        ob.put("role", ADMIN);

        mvc.perform(MockMvcRequestBuilders.post("http://localhost:8080/signup")
                .content(new JSONObject(ob).toJSONString())
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void shouldReturnHTTPStatusOk_whenCreatingUserWithcompleteFields() throws Exception {
        HashMap<String, Object> ob = new HashMap<String, Object>();
        ob.put("name", "mark");
        ob.put("username", "user");
        ob.put("address", "user");
        ob.put("password", "password");
        ob.put("phone", "password");
        ob.put("confirmPassword", "password");
        ob.put("role", ADMIN);

        mvc.perform(MockMvcRequestBuilders.post("http://localhost:8080/signup")
                .content(new JSONObject(ob).toJSONString())
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
