package com.rmit.sept.project.agme.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int duration;
    private int visible;
    private String serviceType;
    private Date startDateTime;

    @ManyToOne
    private Employee employee;

    @ManyToOne
    private Company company;

    @ManyToOne
    private User user;

    public Booking(Date startDateTime, String serviceType, int duration, Employee employee, Company company, User user) {
        this.startDateTime = startDateTime;
        this.serviceType = serviceType;
        this.duration = duration;
        this.employee = employee;
        this.company = company;
        this.user = user;
    }

    public Booking() {}

    public Long getId() {
        return id;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getVisible() {
        return visible;
    }

    public void setVisible(int visible) {
        this.visible = visible;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public Date getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(Date startDateTime) { this.startDateTime = startDateTime; }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
