package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.*;

import com.rmit.sept.project.agme.web.BookingController;
import com.rmit.sept.project.agme.web.EmployeeController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(BookingController.class)

public class EmployeeServiceTest {

    @MockBean
    UserRepository userRepository;

    @MockBean
    UserService userService;

    @MockBean
    JwtUtil jwtUtil;

    @MockBean
    BookingService bookingService;

    @MockBean
    private EmployeeController employeeController;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    BookingController bookingController;

    @MockBean
    CompanyService companyService;

    @MockBean
    EmployeeService employeeService;

    @MockBean
    LoginSignupService loginSignupService;

    @Test
    public void createEmployeeTest() {
        Employee employee = new Employee();

        given(employeeService.addEmployee(employee)).willReturn(employee);
    }

    @Test
    public void getEmployeesTest() {

        List<Employee> employeeList = new ArrayList<>();

        Employee testEmployee = new Employee();
        Employee otherEmployee = new Employee();

        employeeList.add(testEmployee);
        employeeList.add(otherEmployee);

        employeeService.addEmployee(testEmployee);
        employeeService.addEmployee(otherEmployee);

        given(employeeService.getAll()).willReturn(employeeList);
    }

    @Test
    public void loadUserByUsernameTest() {

        Employee employee = new Employee();
        String username = "test";

        employee.setUsername(username);
        employeeService.addEmployee(employee);

        given(employeeService.loadUserByUsername(username)).willReturn(employee);
    }

    @Test
    public void getEmployeeByIdTest() {

        Employee employee = new Employee();
        Long id = 50L;
        employee.setId(id);

        Employee otherEmployee = new Employee();
        Long otherId = 60L;
        otherEmployee.setId(otherId);

        employeeService.addEmployee(employee);

        given(employeeService.getEmployeeById(id)).willReturn(employee);
    }
}
