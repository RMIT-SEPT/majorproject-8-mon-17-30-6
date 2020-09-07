package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Employee;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertNotEquals;
import static org.mockito.BDDMockito.given;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(BookingController.class)
public class EmployeeControllerTest {

    @MockBean
    private EmployeeController employeeController;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testNewEmployee() {
        Employee testEmployee = new Employee();
        Employee result;

        try {
            result = employeeController.newEmployee(testEmployee);
        }
        catch (NullPointerException e)
        {
            result = null;
        }

        assertNotEquals(testEmployee, result);
    }

    @Test
    public void getEmployeesTest() {

        List<Employee> employeeList = new ArrayList<>();

        Employee testEmployee = new Employee();
        Employee otherEmployee = new Employee();

        employeeList.add(testEmployee);
        employeeList.add(otherEmployee);

        employeeController.newEmployee(testEmployee);
        employeeController.newEmployee(otherEmployee);

        given(employeeController.getEmployees()).willReturn(employeeList);
    }
}
