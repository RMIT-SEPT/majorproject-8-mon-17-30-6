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
    private Date startDateTime;

    @ManyToOne
    private Employee employee;

    @ManyToOne
    private Company company;

    @ManyToOne
    private User user;

    @ManyToOne
    private ServiceType serviceType;

    private int hour;


    public Booking(Date startDateTime, int duration, Employee employee, Company company, User user, int hour, ServiceType serviceType) {
        this.startDateTime = startDateTime;
        this.serviceType = serviceType;
        this.duration = duration;
        this.employee = employee;
        this.company = company;
        this.user = user;
        this.hour = hour;
    }

    public Booking() {}

//    public Booking(Date date, int duration, Employee employee, Company company, User user)
//    {
//    }

    public int getHour()
    {
        return hour;
    }

    public void setHour(int hour)
    {
        this.hour = hour;
    }

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

    public ServiceType getServiceType() {
        return serviceType;
    }

    public void setServiceType(ServiceType serviceType) {
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
