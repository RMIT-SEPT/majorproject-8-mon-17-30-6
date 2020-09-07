package com.rmit.sept.project.agme.model;

import javax.persistence.*;

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String userType;

    @ManyToOne
    private Company company;

    public Employee() {}

    public Employee(String username, String userType, Company company) {
        this.username = username;
        this.userType = userType;
        this.company = company;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Company getCompany() { return company; }

    public void setCompany(Company company) { this.company = company; }
}
