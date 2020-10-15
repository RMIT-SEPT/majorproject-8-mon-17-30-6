package com.rmit.sept.project.agme.model;

import java.util.Date;

// Request for availability
public class HelpRequest
{
    private String user;
    private String name;
    private String email;
    private String serviceName;
    private String message;

    public HelpRequest(){

    }

    public void setUser(String user){
        this.user = user;
    }
    public void setName(String name){
        this.name = name;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public void setServiceName(String serviceName){
        this.serviceName = serviceName;
    }
    public void setMessage(String message){
        this.message = message;
    }
    public String getUser(){
        return this.user;
    };
    public String getName(){
        return this.name;
    }
    public String getEmail(){
        return this.email;
    }
    public String getServiceName(){
        return this.serviceName;
    }
    public String getMessage(){
        return this.message;
    }

}
