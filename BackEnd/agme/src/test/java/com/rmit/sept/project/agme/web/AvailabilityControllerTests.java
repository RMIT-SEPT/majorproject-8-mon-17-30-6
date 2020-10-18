package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.model.Role;
import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.*;
import net.minidev.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Date;
import java.util.HashMap;

import static com.rmit.sept.project.agme.model.Role.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(AvailabilityController.class)
public class AvailabilityControllerTests {

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
    EmailService emailService;

    @MockBean
    CompanyService companyService;

    @MockBean
    EmployeeService employeeService;

    @MockBean
    BookingService bookingService;

    @MockBean
    AdminService adminService;

    @MockBean
    AvailabilityService availabilityService;

    @MockBean
    ServiceTypeService serviceTypeService;


    @Test
    public void availabilityServiceRequest_shouldReturnHTTPStatus400_whenWrongFormatIsSupplied() throws Exception {
        HashMap<String, Object> ob = new HashMap<>();
        ob.put("name", "mark");
        ob.put("username", "user");

        mvc.perform(MockMvcRequestBuilders.post("http://localhost:8080/availability")
                .content(new JSONObject(ob).toJSONString())
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    public void availabilityServiceRequest_shouldReturnHTTPStatus403_whenIsBadRequest() throws Exception {
        HashMap<String, Object> ob = new HashMap<>();
        ob.put("date", new Date());
        ob.put("companyUsername", "Hairy");
        ob.put("employeeUsername", "mark");
        ob.put("serviceName", "Hairdressing");
        ob.put("duration", "2");


        mvc.perform(MockMvcRequestBuilders.post("http://localhost:8080/availability")
                .content(new JSONObject(ob).toJSONString())
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

}
