package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.*;
import com.rmit.sept.project.agme.repositories.CompanyRepository;
import com.rmit.sept.project.agme.repositories.EmployeeRepository;
import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static com.rmit.sept.project.agme.model.Role.*;
import static com.rmit.sept.project.agme.model.Role.ADMIN;

@Service
public class LoginSignupService {
    @Autowired
    UserService userService;

    @Autowired
    EmployeeService employeeService;

    @Autowired
    CompanyService companyService;

    @Autowired
    AdminService adminService;
    public UserDetails loadUserByUsername(String username){
        UserDetails user = null;
        if (userService.loadUserByUsername(username) != null){
            user = userService.loadUserByUsername(username);
        }else if (employeeService.loadUserByUsername(username) != null){
            user = employeeService.loadUserByUsername(username);
        }else if (companyService.loadUserByUsername(username) != null){
            user = companyService.loadUserByUsername(username);
        }else if (companyService.loadUserByUsername(username) != null){
            user = companyService.loadUserByUsername(username);
        }else if (adminService.loadUserByUsername(username) != null){
            user = adminService.loadUserByUsername(username);
        }
        return user;

    }
    @Autowired
    JwtUtil jwtUtil;
    public ResponseEntity<?> login(AuthenticationRequest authenticationRequest){

//        checks that the relevant fields are filled out
        if (authenticationRequest.getUsername() != null && authenticationRequest.getPassword() != null) {
//            authenticates the given data with the database
            if (authenticationRequest.getRole() == EMPLOYEE) {
                if (employeeService.authenticateUser(authenticationRequest.getUsername(), authenticationRequest.getPassword())) {
                    final UserDetails user = employeeService.loadUserByUsername(
                            authenticationRequest.getUsername());
//                generate token
                    final String jwt = jwtUtil.generateToken(user);
//                respond wih token
                    return ResponseEntity.ok(new AuthenticationResponse(jwt));
                }else{
                    return ResponseEntity.badRequest().body("Invalid username and password");
                }
            } else if (authenticationRequest.getRole() == COMPANY) {
                if (companyService.authenticateUser(authenticationRequest.getUsername(), authenticationRequest.getPassword())) {
                    final UserDetails user = companyService.loadUserByUsername(
                            authenticationRequest.getUsername());
//                generate token
                    final String jwt = jwtUtil.generateToken(user);
//                respond wih token
                    return ResponseEntity.ok(new AuthenticationResponse(jwt));
                }else{
                    return ResponseEntity.badRequest().body("Invalid username and password");
                }
            } else if (authenticationRequest.getRole() == USER) {
                if (userService.authenticateUser(authenticationRequest.getUsername(), authenticationRequest.getPassword())) {
//                if details match, retrieve the user
                    final UserDetails user = userService.loadUserByUsername(
                            authenticationRequest.getUsername());
//                generate token
                    final String jwt = jwtUtil.generateToken(user);
//                respond wih token
                    userService.sendReminderEmails();
                    return ResponseEntity.ok(new AuthenticationResponse(jwt));
                }else{
                    return ResponseEntity.badRequest().body("Invalid username and password");
                }
            }else if (authenticationRequest.getRole() == ADMIN) {
                if (adminService.authenticateUser(authenticationRequest.getUsername(), authenticationRequest.getPassword())) {
                    final UserDetails user = adminService.loadUserByUsername(
                            authenticationRequest.getUsername());
//                generate token
                    final String jwt = jwtUtil.generateToken(user);
//                respond wih token
                    return ResponseEntity.ok(new AuthenticationResponse(jwt));
                }else{
                    return ResponseEntity.badRequest().body("Invalid username and password");
                }
            }
        } else {
            return ResponseEntity.badRequest().body("Please enter a username and password");

        }
        return ResponseEntity.badRequest().body("Invalid username and password");
    }



    @Autowired
    LoginSignupService loginSignupService;

    public ResponseEntity<?> signup(SignUpRequest user, BindingResult result){
        List<String> errorsTypeAndValues = new ArrayList<>();
        HashMap<String,Object> errorContainer = new HashMap<>();
//            hashmap containing the errors details
        HashMap<String,Object> errorDetails = new HashMap<>();
        List<String> errorMessages = new ArrayList<>();

        boolean containsErrors = false;
//        Error messages depending on the user type
        if (user.getRole() == COMPANY){
            if (user.getCompany_name() == null || user.getCompany_name() == ""){
                errorsTypeAndValues.add("companyName");
                containsErrors = true;
            }
        }else if (user.getRole() == EMPLOYEE){
            if (user.getCompanyUsername() == null|| user.getCompanyUsername() == ""){
                errorsTypeAndValues.add("companyUsername");
                containsErrors = true;
            }

        }
//        validates form data to ensure all criteria is met
        if (result.hasErrors() || !user.getPassword().equals(user.getConfirmPassword()) ||  containsErrors ||
                loginSignupService.loadUserByUsername(user.getUsername()) != null) {
//            hashmap for the outer container of errors

//            array list for the fields that have errors
            //            provides error code as well as a list of the fields with errors
            errorDetails.put("errorType", "PARTIAL_INFORMATION");
            errorContainer.put("ErrorId", "404API");

//            loops through the errors and adds them to the arraylist
            if (!user.getPassword().equals(user.getConfirmPassword())){
                errorsTypeAndValues.add("confirmPassword");
            }
            if (loginSignupService.loadUserByUsername(user.getUsername()) != null){
                errorsTypeAndValues.add("username");
            }
            for (FieldError error: result.getFieldErrors()){
//                return new ResponseEntity<List<FieldError>>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
                errorsTypeAndValues.add(error.getField());
                errorMessages.add(error.getDefaultMessage());

            }

            errorDetails.put("missingFields", errorsTypeAndValues);
            errorDetails.put("errorMsg", errorMessages);

            errorContainer.put("errorDetails", errorDetails);
//            returns JSON response with error details
            return new ResponseEntity<>(errorContainer, HttpStatus.BAD_REQUEST);
        }


//         validation to ensure user does not exist and all details are filled out
        if (loginSignupService.loadUserByUsername(user.getUsername()) == null) {
//            ensure password is equal to the confirmPassword field
            if (user.getPassword().equals(user.getConfirmPassword())) {
//            hash the password before storing
                user.hashPassword();
//                Creates a user depending on the type
                if (user.getRole() == Role.COMPANY){
                    Company user1 = new Company(user.getUsername(), user.getName(), user.getPassword()
                            ,user.getConfirmPassword(), user.getAddress(), user.getPhone(), user.getRole(), user.getCompanyName(), user.getEmail());
                    companyService.saveOrUpdate(user1);
                }else if (user.getRole() == Role.USER){
                    User user1 = new User(user.getUsername(), user.getName(), user.getPassword()
                            ,user.getConfirmPassword(), user.getAddress(), user.getPhone(), user.getRole(), user.getEmail());
                    userService.saveOrUpdateUser(user1);

                }else if (user.getRole() == Role.ADMIN){
                    Admin user1 = new Admin(user.getUsername(), user.getName(), user.getPassword()
                            ,user.getConfirmPassword(), user.getAddress(), user.getPhone(), user.getRole(), user.getEmail());
                    adminService.saveOrUpdateUser(user1);

                }else if (user.getRole() == EMPLOYEE){
                    Employee user1 = new Employee(user.getUsername(), user.getName(), user.getPassword()
                            ,user.getConfirmPassword(), user.getAddress(), user.getPhone(), user.getRole(),
                            companyService.loadUserByUsername(user.getCompanyUsername()), user.getCompanyUsername(), user.getEmail());
                    employeeService.addEmployee(user1);
                    Company comp = companyService.loadUserByUsername(user.getCompanyUsername());
                    if (comp != null) {
                        comp.addEmployee(user1);
                        companyService.saveOrUpdate(comp);
                    }else{
                        errorsTypeAndValues.add("companyUsername");
                        errorDetails.put("missingFields", errorsTypeAndValues);
                        errorDetails.put("errorMsg", errorMessages);

                        errorContainer.put("errorDetails", errorDetails);
//            returns JSON response with error details
                        return new ResponseEntity<>(errorContainer, HttpStatus.BAD_REQUEST);

                    }
                }

//            store user with hashed password in database
//            if signup is successful, return the user
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
//                no error in form validation, and user does not exist responds with a try again code
                return new ResponseEntity<>("An error has occurred, please try again later", HttpStatus.BAD_REQUEST);
            }
        }else{
//            responds with username is taken
            return new ResponseEntity<>("Username is taken", HttpStatus.BAD_REQUEST);
        }
    }
    public HashMap<String, String> getListOfActiveCompanies(){
        List<Company> companies = new ArrayList<>();
        Iterable<Company> aa =  companyService.getAll();
        aa.forEach(companies::add);
        HashMap<String, String> returnVal = new HashMap<>();
        for (Company next:companies){
            if (next.isActive()) {
                returnVal.put(next.getUsername(), next.getCompanyName());
            }
        }
        return returnVal;
    }
}
