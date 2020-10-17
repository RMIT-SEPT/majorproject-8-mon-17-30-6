package com.rmit.sept.project.agme.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int duration;
    private int visible;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yy HH:mm:ss")
    private Date startDateTime;

    @ManyToOne
    private Employee employee;

    @ManyToOne
    private Company company;

    @ManyToOne
    private User user;

    boolean reminderSent = false;
//    the service that has been chosen
    @ManyToOne
    private ServiceType serviceType;




//    Constructor for booking
    public Booking(Date startDateTime, int duration, Employee employee, Company company, User user, ServiceType serviceType) {
        this.startDateTime = startDateTime;
        this.serviceType = serviceType;
        this.duration = duration;
        this.employee = employee;
        this.company = company;
        this.user = user;
    }

    public Booking() {}

//    public Booking(Date date, int duration, Employee employee, Company company, User user)
//    {
//    }


    public boolean isReminderSent()
    {
        return reminderSent;
    }

    public void setReminderSent(boolean reminderSent)
    {
        this.reminderSent = reminderSent;
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
    
    public String toString() {
    	
    	if (startDateTime != null && serviceType != null && employee != null && company != null && user != null) {
    		return startDateTime.toString() + " " + serviceType.getName() + " " +  employee.getName() + " " +  company.getName() + " " +  user.getName();
    	}
    	else {
    		return "Something's null!";
    	}
    	
    }
}
