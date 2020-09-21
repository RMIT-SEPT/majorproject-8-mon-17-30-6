package com.rmit.sept.project.agme.model;

//Class to get username and password for login
public class AuthenticationRequest {
    private String username;
    private String password;
    private  Role role;
    public AuthenticationRequest() {
    }

    public AuthenticationRequest(String username, String password, Role role) {
        this.username = username;
        this.password = password;
        this.role = role;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
