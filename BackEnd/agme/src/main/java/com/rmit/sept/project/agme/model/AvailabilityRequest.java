package com.rmit.sept.project.agme.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

// Request for availability
public class AvailabilityRequest
{
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yy HH:mm:ss")
    private Date date;
    private String companyUsername;
    private String employeeUsername;
    private String serviceName;
    private String duration;

    public AvailabilityRequest(){

    }

    public String getDuration()
    {
        return duration;
    }

    public void setDuration(String duration)
    {
        this.duration = duration;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
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

    public String getEmployeeUsername()
    {
        return employeeUsername;
    }

    public void setEmployeeUsername(String employeeUsername)
    {
        this.employeeUsername = employeeUsername;
    }
}
