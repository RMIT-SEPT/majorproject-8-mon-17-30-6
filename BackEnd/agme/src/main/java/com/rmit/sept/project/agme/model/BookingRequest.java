package com.rmit.sept.project.agme.model;

import java.util.Date;

//Class to create a booking
public class BookingRequest
{
    private Date date;
    private String  companyUsername;
    private int duration;
    private String serviceType;
    private String  employeeUsername;
    private int hour;

    public BookingRequest(){

    }

    public int getHour()
    {
        return hour;
    }

    public void setHour(int hour)
    {
        this.hour = hour;
    }

    public String getEmployeeUsername()
    {
        return employeeUsername;
    }

    public void setEmployeeUsername(String employeeUsername)
    {
        this.employeeUsername = employeeUsername;
    }

    public String getServiceType()
    {
        return serviceType;
    }

    public void setServiceType(String serviceType)
    {
        this.serviceType = serviceType;
    }

    public Date getDate()
    {
        return date;
    }

    public void setDate(Date date)
    {
        this.date = date;
    }

    public String getCompanyUsername()
    {
        return companyUsername;
    }

    public void setCompanyUsername(String companyUsername)
    {
        this.companyUsername = companyUsername;
    }

    public int getDuration()
    {
        return duration;
    }

    public void setDuration(int duration)
    {
        this.duration = duration;
    }
}
