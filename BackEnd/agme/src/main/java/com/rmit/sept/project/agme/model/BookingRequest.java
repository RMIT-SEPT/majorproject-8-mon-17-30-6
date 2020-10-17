package com.rmit.sept.project.agme.model;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

//Class to create a booking
public class BookingRequest
{
    private Date date;
//    private String  companyUsername;
    private int duration;
    private String serviceType;
    private String  employeeUsername;

    public BookingRequest(Date date, int duration, String serviceType, String employeeUsername){
        this.date = date;
        this.duration = duration;
        this.serviceType = serviceType;
        this.employeeUsername = employeeUsername;
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
        DateFormat formatDate = new SimpleDateFormat("dd/MM/yy HH:mm:ss");
        System.out.println(date.getHours());
        return date;
    }

    public void setDate(Date date)
    {
        DateFormat formatDate = new SimpleDateFormat("dd/MM/yy HH:mm:ss");
        this.date = date;
    }

//    public String getCompanyUsername()
//    {
//        return companyUsername;
//    }
//
//    public void setCompanyUsername(String companyUsername)
//    {
//        this.companyUsername = companyUsername;
//    }

    public int getDuration()
    {
        return duration;
    }

    public void setDuration(int duration)
    {
        this.duration = duration;
    }
}
