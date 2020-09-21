package com.rmit.sept.project.agme.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

// Entity for the services offered
@Entity
public class ServiceType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
//    Companies that offer this service
    @ManyToMany
    private List<Company> company = new ArrayList<>();


    public ServiceType(String name, String description) {
        this.name = name;
        this.description = description;
    }
    public ServiceType() {

    }
    public void addCompany(Company company){
        this.company.add(company);
    }

    public List<Company> getCompany()
    {
        return company;
    }

    public void setCompany(List<Company> company)
    {
        this.company = company;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }
}