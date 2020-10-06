package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.repositories.CompanyRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(CompanyService.class)
public class CompanyServiceTests {

    @MockBean
    CompanyService companyService;

    @MockBean
    CompanyRepository companyRepository;

    @MockBean
    JwtUtil jwt;

    @MockBean
    LoginSignupService loginSignupService;

    @MockBean
    UserService userService;

    @MockBean
    BookingService bookingService;

    @Test
    public void createCompanyTest() {
        Company company = new Company();

        Company output = companyService.addCompany(company);

        given(company).willReturn(output);
    }

    @Test
    public void getAllCompanyTest() {

        Company comp1 = new Company();
        Company comp2 = new Company();

        List<Company> list = new ArrayList<>();
        list.add(comp1);
        list.add(comp2);

        companyService.addCompany(comp1);
        companyService.addCompany(comp2);

        given(companyService.getAll()).willReturn(list);
    }

    @Test
    public void loadUserByUsernameTest() {
        Company user = new Company();
        String username = "test";
        user.setUsername(username);

        companyService.saveOrUpdate(user);

        given(companyService.loadUserByUsername(username)).willReturn(user);
    }
}
