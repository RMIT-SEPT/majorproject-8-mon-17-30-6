package com.rmit.sept.project.agme.model;

public class SignUpRequest extends AbstractUser {
    public String companyName;
    private Company company;
    private String userType;

    public SignUpRequest(){

    }

    public String getCompany_name() {
        return companyName;
    }

    public void setCompany_name(String companyName) {
        this.companyName = companyName;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }
}
