package com.rmit.sept.project.agme.model;

import java.util.Date;

// Request for availability
public class HelpRequest
{
    private Date date;
    private String user;
    private String serviceName;
    private String message;


    public HelpRequest(){

    }

    public void setUser(String user){
        this.user = user;
    }
    public void setServiceName(String user){
        this.user = user;
    }


}
