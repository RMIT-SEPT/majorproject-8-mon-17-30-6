package com.rmit.sept.project.agme.model;

import com.sun.istack.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.security.SecureRandom;
import java.util.Date;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String username;
    private String address;
//    private String phone;
    private String password;
//    private Date lastLogin;
//    private Date createdAt;
//    private Date updatedAt;
    SecureRandom salt;



    public User() {

    }
//
//    @PrePersist
//    protected void onCreate(){
//        this.createdAt = new Date();
//    }
//
//    @PreUpdate
//    protected void onUpdate(){
//        this.updatedAt = new Date();
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
    public String getUsername() {
        return username;
    }
//
//    public String getAddress() {
//        return address;
//    }
//
//    public void setAddress(String address) {
//        this.address = address;
//    }
//
//    public String getPhone() {
//        return phone;
//    }
//
//    public void setPhone(String phone) {
//        this.phone = phone;
//    }
//
//
    public void setPassword(String password) {
        int strength = 10; // work factor of bcrypt
        SecureRandom salt = new SecureRandom();
        this.salt = salt;
        BCryptPasswordEncoder bCryptPasswordEncoder =
                new BCryptPasswordEncoder(strength, salt);
        this.password = bCryptPasswordEncoder.encode(password);
    }
    public SecureRandom getSalt(){
        return salt;
    }

    public String getPassword(){
        return password;
    }
//    public Date getLastLogin() {
//        return lastLogin;
//    }



}
