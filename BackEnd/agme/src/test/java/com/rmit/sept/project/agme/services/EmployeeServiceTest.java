package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.repositories.EmployeeRepository;
import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.web.BookingController;
import com.rmit.sept.project.agme.web.EmployeeController;
import org.junit.Assert;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static com.rmit.sept.project.agme.model.Role.EMPLOYEE;
import static org.mockito.BDDMockito.given;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(BookingController.class)

public class EmployeeServiceTest {

    @MockBean
    EmployeeRepository employeeRepository;
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
    public void getEmployeesTest_shouldReturnListOfemployees_WhenRequested() {

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
    public void loadUserByUsernameTest_shouldReturnEmployee_whenCalled() {

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
    @Test
    public void loademployee_shouldReturnTrue_WithfindbyId() throws Exception {
        Employee employee = new Employee();
        employee.setName("test employee");
        employee.setUsername("alasex");
        employee.setPhone("00");
        employee.setAddress("addy");
        employee.setConfirmPassword("password");
        employee.setName("name");
        employee.setRole(EMPLOYEE);
        employee.setPassword("password");
        Long id = 1L;
        Employee employee2 = employeeService.saveOrUpdate(employee);
        Employee employeeFound = employeeService.loadUserByUsername(employee.getUsername());
        Assert.assertEquals(employee2, employeeFound);
    }
    @Rule
    public ExpectedException exceptionRule = ExpectedException.none();

    @Test
    public void createNewemployee_shouldThrowException_WithIncompleteFields() throws Exception {
        Employee employee = new Employee();
        employee.setName("test employee");
        employee.setUsername("alex");
        employee.setConfirmPassword("password");
        employee.setRole(EMPLOYEE);
        employee.setPassword("password");
        Long id = 1L;
        Employee employee2 = employeeService.saveOrUpdate(employee);
        Assert.assertEquals(null, employee2);
    }
    @Test
    public void createNewemployee_shouldThrowException_whenPasswordsDoNotMatch() throws Exception {
        Employee employee = new Employee();
        employee.setName("test employee");
        employee.setUsername("alex");
        employee.setConfirmPassword("pasdsword");
        employee.setRole(EMPLOYEE);
        employee.setPassword("password");
        Long id = 1L;
        Employee employee2 = employeeService.saveOrUpdate(employee);
        Assert.assertEquals(null, employee2);
    }
    @Test
    public void getAll_shouldReturnAList_whenCalled() throws Exception {
        Employee employee = new Employee();
        employee.setName("test employee");
        employee.setUsername("alexisdasd");
        employee.setPhone("00");
        employee.setAddress("addy");
        employee.setConfirmPassword("password");
        employee.setName("name");
        employee.setEmail("email");
        employee.setRole(EMPLOYEE);
        employee.setPassword("password");
        Long id = 1L;
        employeeService.saveOrUpdate(employee);
        List<Employee> employees = new ArrayList<Employee>();
        employees.add(employee);
        List<Employee> employeesFound = employeeService.getAll();
        employeesFound.add(employee);
        Assert.assertEquals(employees.size(), employeesFound.size());
    }
    @Test
    public void authenticateaUser_shouldReturnTrue_whenDetailsMatch() throws Exception {
        Employee employee = new Employee();
        employee.setName("test employee");
        employee.setUsername("alex");
        employee.setPhone("00");
        employee.setAddress("addy");
        employee.setConfirmPassword("password");
        employee.setName("name");
        employee.setRole(EMPLOYEE);
        employee.setPassword("password");
        employee.hashPassword();
        Long id = 1L;
        employeeRepository.save(employee);
        boolean result = employeeService.authenticateUser(null,null);
    }
    @Test
    public void authenticateaUser_shouldReturnFalse_whenDetailsDontMatch() throws Exception {
        Employee employee = new Employee();
        employee.setName("test employee");
        employee.setUsername("alex");
        employee.setPhone("00");
        employee.setAddress("addy");
        employee.setConfirmPassword("password");
        employee.setName("name");
        employee.setRole(EMPLOYEE);
        employee.setPassword("password");
        employee.hashPassword();
        Long id = 1L;
        employeeRepository.save(employee);
        boolean result = employeeService.authenticateUser(null,null);
    }
    @Test
    public void authenticateaUser_shouldThrowNullPointerException_whenNoemployeenameAndPasswordAtGiven() throws Exception {
        Employee employee = new Employee();
        employee.setName("test employee");
        employee.setUsername("alex");
        employee.setPhone("00");
        employee.setAddress("addy");
        employee.setConfirmPassword("password");
        employee.setName("name");
        employee.setRole(EMPLOYEE);
        employee.setPassword("password");
        employee.hashPassword();
        Long id = 1L;
        employeeRepository.save(employee);
        boolean result = employeeService.authenticateUser(null,null);
        Assert.assertEquals(false, result);

    }
}
