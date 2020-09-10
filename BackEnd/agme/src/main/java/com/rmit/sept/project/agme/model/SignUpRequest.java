package com.rmit.sept.project.agme.model;

public class SignUpRequest extends AbstractUser {
    public String companyName;
    private String companyUsername;
    private String userType;

    public SignUpRequest(){

    }

    public String getCompany_name() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getCompanyUsername() {
        return companyUsername;
    }

    public void setCompanyUsername(String companyUsername) {
        this.companyUsername = companyUsername;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }
}
