package com.rmit.sept.project.agme.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String username;
    private String address;
    private String phone;
    private String password;
    private Date lastLogin;
    private Date dateCreated;

    public Users(long id, String name, String username, String address, String phone,
                 String password, Date lastLogin, Date dateCreated, Date onUpdate) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.address = address;
        this.phone = phone;
        this.password = password;
        this.lastLogin = lastLogin;
        this.dateCreated = dateCreated;
        this.onUpdate = onUpdate;
    }

    private Date onUpdate;

    @PrePersist
    protected void onCreate(){
        this.dateCreated = new Date();
    }

    @preUpdate
    protected void onUpdate(){
        this.updateAt = new Date()
    }
    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(Date lastLogin) {
        this.lastLogin = lastLogin;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }
}
