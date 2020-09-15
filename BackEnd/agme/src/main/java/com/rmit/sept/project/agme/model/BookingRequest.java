package com.rmit.sept.project.agme.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Date;

public class BookingRequest
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int duration;
    private int visible;
    private String serviceType;
    private Date startDateTime;
    private String employeeUsername;
    private String companyUsername;
    private String userUsername;

    public BookingRequest(Date startDateTime, String serviceType, int duration, String employeeUsername, String companyUsername, String user)
    {
        this.startDateTime = startDateTime;
        this.serviceType = serviceType;
        this.duration = duration;
        this.employeeUsername = employeeUsername;
        this.companyUsername = companyUsername;
        this.userUsername = userUsername;
    }

    public BookingRequest()
    {
    }

    public Long getId()
    {
        return id;
    }

    public int getDuration()
    {
        return duration;
    }

    public void setDuration(int duration)
    {
        this.duration = duration;
    }

    public int getVisible()
    {
        return visible;
    }

    public void setVisible(int visible)
    {
        this.visible = visible;
    }

    public String getServiceType()
    {
        return serviceType;
    }

    public void setServiceType(String serviceType)
    {
        this.serviceType = serviceType;
    }

    public Date getStartDateTime()
    {
        return startDateTime;
    }

    public void setStartDateTime(Date startDateTime)
    {
        this.startDateTime = startDateTime;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getEmployeeUsername()
    {
        return employeeUsername;
    }

    public void setEmployeeUsername(String employeeUsername)
    {
        this.employeeUsername = employeeUsername;
    }

    public String getCompanyUsername()
    {
        return companyUsername;
    }

    public void setCompanyUsername(String companyUsername)
    {
        this.companyUsername = companyUsername;
    }

    public String getUserUsername()
    {
        return userUsername;
    }

    public void setUserUsername(String userUsername)
    {
        this.userUsername = userUsername;
    }
}
