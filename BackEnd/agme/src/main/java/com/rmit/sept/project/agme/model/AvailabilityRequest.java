package com.rmit.sept.project.agme.model;

import java.util.Date;

public class AvailabilityRequest
{
    private Date date;
    private String companyUsername;
    private String workerUsername;

    public AvailabilityRequest(){

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

    public String getWorkerUsername()
    {
        return workerUsername;
    }

    public void setWorkerUsername(String workerUsername)
    {
        this.workerUsername = workerUsername;
    }
}
