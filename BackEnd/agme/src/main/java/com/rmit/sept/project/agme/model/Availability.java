package com.rmit.sept.project.agme.model;

import javax.persistence.*;
import java.util.Date;

//Class to give availability for a worker on a given day
@Entity
@Table
public class Availability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date startDateTime;
    private int duration;
    private String serviceType;

    @ManyToOne
    private Employee employee;

    public Availability() {
    }

    public Long getId() {
        return id;
    }

    public Date getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(Date startDateTime) {
        this.startDateTime = startDateTime;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }
}
