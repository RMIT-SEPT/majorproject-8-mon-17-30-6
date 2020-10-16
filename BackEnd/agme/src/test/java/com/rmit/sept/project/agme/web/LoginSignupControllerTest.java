package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Role;
import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.*;
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

import static com.rmit.sept.project.agme.model.Role.COMPANY;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(LoginSignupController.class)
public class LoginSignupControllerTest {

    @Autowired
    MockMvc mvc;

    @MockBean
    UserRepository userRepository;

    @MockBean
    JwtUtil jwtUtil;

    @MockBean
    LoginSignupService loginSignupService;

    @MockBean
    UserService userService;


    @MockBean
    CompanyService companyService;

    @MockBean
    EmployeeService employeeService;

    @MockBean
    BookingService bookingService;

    @MockBean
    AdminService adminService;
    @Test
    public void shouldReturnHTTPStatus400_whenCreatingUserWithIncompleteFields() throws Exception {
        HashMap<String, Object> ob = new HashMap<>();
        ob.put("name", "mark");
        ob.put("username", "user");
        ob.put("address", "user");
        ob.put("password", "password");
        ob.put("confirmPassword", "password");
        ob.put("role", Role.USER);

        mvc.perform(MockMvcRequestBuilders.post("http://localhost:8080/signup")
                .content(new JSONObject(ob).toJSONString())
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }
    @Test
    public void shouldReturnHTTPStatus400_whenCreatingUserWithcompleteFieldsButPWDoesNotMatch() throws Exception {
        HashMap<String, Object> ob = new HashMap<>();
        ob.put("name", "mark");
        ob.put("username", "user");
        ob.put("address", "user");
        ob.put("password", "password");
        ob.put("confirmPassword", "pass1word");
        ob.put("role", Role.USER);

        mvc.perform(MockMvcRequestBuilders.post("http://localhost:8080/signup")
                .content(new JSONObject(ob).toJSONString())
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void shouldReturnHTTPStatusOk_whenCreatingUserWithcompleteFields() throws Exception {
        HashMap<String, Object> ob = new HashMap<>();
        ob.put("name", "mark");
        ob.put("username", "user");
        ob.put("address", "user");
        ob.put("password", "password");
        ob.put("phone", "password");
        ob.put("email", "password");

        ob.put("confirmPassword", "password");
        ob.put("role", Role.USER);

        mvc.perform(post("/signup")
                .content(new JSONObject(ob).toJSONString())
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
    @Test
    public void shouldReturnHTTPStatus400_whenCreatingCompanyWithIncompleteFields() throws Exception {
        HashMap<String, Object> ob = new HashMap<>();
        ob.put("name", "mark");
        ob.put("username", "user");
        ob.put("address", "user");
        ob.put("password", "password");
        ob.put("confirmPassword", "password");
        ob.put("role", COMPANY);

        mvc.perform(MockMvcRequestBuilders.post("http://localhost:8080/signup")
                .content(new JSONObject(ob).toJSONString())
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }
    @Test
    public void shouldReturnHTTPStatusok_whenCreatingCompanyWithcompleteFields() throws Exception {
        HashMap<String, Object> ob = new HashMap<>();
        ob.put("name", "mark");
        ob.put("username", "user");
        ob.put("address", "user");
        ob.put("password", "password");
        ob.put("phone", "password");
        ob.put("email", "password");

        ob.put("confirmPassword", "password");
        ob.put("companyName", "password");
        ob.put("role", Role.COMPANY);

        mvc.perform(post("/signup")
                .content(new JSONObject(ob).toJSONString())
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
    @Test
    public void shouldReturnHTTPStatus400_whenCreatingCompanyWithcompleteFieldsButPWDoesNotMatch() throws Exception {
        HashMap<String, Object> ob = new HashMap<>();
        ob.put("name", "mark");
        ob.put("username", "user");
        ob.put("address", "user");
        ob.put("password", "pa1ssword");
        ob.put("confirmPassword", "pass1word");
        ob.put("role", Role.USER);

        mvc.perform(MockMvcRequestBuilders.post("http://localhost:8080/signup")
                .content(new JSONObject(ob).toJSONString())
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }
    @Test
    public void shouldReturnHTTPStatus400_whenCreatingEmployeeWithcompleteFieldsButPWDoesNotMatch() throws Exception {
        HashMap<String, Object> ob = new HashMap<>();
        ob.put("name", "mark");
        ob.put("username", "user");
        ob.put("address", "user");
        ob.put("password", "password");
        ob.put("confirmPassword", "pass1word");
        ob.put("role", Role.EMPLOYEE);

        mvc.perform(MockMvcRequestBuilders.post("http://localhost:8080/signup")
                .content(new JSONObject(ob).toJSONString())
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }
    @Test
    public void shouldReturnHTTPStatus404_whenCreatingEmployeeWithcompleteFieldsButCompanyDoesNotExist() throws Exception {
        HashMap<String, Object> ob = new HashMap<>();
        ob.put("name", "mark");
        ob.put("username", "user1");
        ob.put("address", "user");
        ob.put("password", "password");
        ob.put("phone", "password");
        ob.put("confirmPassword", "password");
        ob.put("companyUsername", "user");
        ob.put("role", Role.EMPLOYEE);

        mvc.perform(post("/signup")
                .content(new JSONObject(ob).toJSONString())
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }
}
