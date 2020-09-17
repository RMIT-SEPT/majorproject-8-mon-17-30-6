package com.rmit.sept.project.agme.model;

import org.springframework.security.crypto.bcrypt.BCrypt;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.lang.annotation.Inherited;
import java.util.Date;

// Abstract class for common methods and variable for all user types
@MappedSuperclass
public abstract class AbstractUser {
    @NotBlank(message = "Username cannot be blank")
    private String username;
    @NotBlank(message = "name cannot be blank")
    private String name;
    @NotBlank(message = "Password cannot be blank")
    @Size(min=6, message="Password must be at least 6 characters\n")
    private String password;
    @Transient
    private String confirmPassword;
    @NotBlank(message = "address cannot be blank")
    private String address;
    @NotBlank(message = "phone cannot be blank")
    private String phone;
    private Date lastLogin;
    private Date createdAt;
    private Date updatedAt;
    Role role;
    String salt;



    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    @PrePersist
    protected void onCreate(){
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.lastLogin = new Date();

    }


    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = new Date();
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
    public void hashPassword() {
/*
        int strength = 10; // work factor of bcrypt
        BCryptPasswordEncoder bCryptPasswordEncoder =
                new BCryptPasswordEncoder(strength);
        this.password = bCryptPasswordEncoder.encode(password);
*/
        this.salt = BCrypt.gensalt();
        this.password = BCrypt.hashpw(password, salt);

    }

    public Date getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(Date lastLogin) {
        this.lastLogin = lastLogin;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
