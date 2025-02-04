package com.rmit.sept.project.agme.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.*;

@Entity
public class Employee extends AbstractUser implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Company company;

    private String companyUsername;
    @OneToMany
    private final List<Booking> list = new ArrayList<>();

    public Employee() {}
//  Constructor to create an employee
    public Employee(String username, String name, String password, String confirmPassword,
                    String address, String phone, Role role, Company company, String companyUsername,String email) {
        setUsername(username);
        setName(name);
        setPassword(password);
        setConfirmPassword(confirmPassword);
        setAddress(address);
        setPhone(phone);
        setRole(role);
        setEmail(email);
        this.companyUsername = companyUsername;
        this.company = company;
    }
    public Employee(String username, Company company) {
        this.setUsername(username);
        this.company = company;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyUsername() {
        return companyUsername;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        final List<SimpleGrantedAuthority> authorities = new LinkedList<>();
        authorities.add(new SimpleGrantedAuthority(this.getRole().toString()));
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }


    public Company getCompany() { return this.company; }

    public void setCompany(Company company) {
        this.company = company; }
}
