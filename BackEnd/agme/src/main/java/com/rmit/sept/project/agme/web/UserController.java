package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.*;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.CompanyService;
import com.rmit.sept.project.agme.services.EmployeeService;
import com.rmit.sept.project.agme.services.LoginSignupService;
import com.rmit.sept.project.agme.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.*;

import static com.rmit.sept.project.agme.model.Role.COMPANY;
import static com.rmit.sept.project.agme.model.Role.EMPLOYEE;

@RestController
@RequestMapping("")
@CrossOrigin("http://localhost:3000")
public class UserController {
//
//    inject User service
    @Autowired
    private UserService userService;

    @Autowired
    private LoginSignupService loginSignupService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    EmployeeService employeeService;



    @GetMapping("/signup")
    public ResponseEntity<?> getCompanies() {
        List<Company> companies = new ArrayList<>();
        Iterable<Company> aa =  companyService.getAll();
        aa.forEach(companies::add);
        HashMap<String, String> returnVal = new HashMap<>();
        for (Company next:companies){
            returnVal.put(next.getUsername(), next.getCompanyName());
        }
        return new ResponseEntity<>(returnVal, HttpStatus.OK);
    }
//    signup authentication
    @PostMapping("/signup")
    public ResponseEntity<?> createdNewUser(@Valid @RequestBody SignUpRequest user, BindingResult result) {
        List<String> errorsTypeAndValues = new ArrayList<>();
        boolean containsErrors = false;

        if (user.getRole() == COMPANY){
            if (user.getCompany_name() == null || user.getCompany_name() == ""){
                errorsTypeAndValues.add("companyName");
                containsErrors = true;
            }
        }else if (user.getRole() == EMPLOYEE){
            if (user.getCompany() == null){
                errorsTypeAndValues.add("company");
                containsErrors = true;
            }
            if (user.getUserType()== null || user.getUserType() == ""){
                errorsTypeAndValues.add("userType");
                containsErrors = true;
            }
        }
//        validates form data to ensure all criteria is met
        if (result.hasErrors() || !user.getPassword().equals(user.getConfirmPassword()) ||  containsErrors ||
        loginSignupService.loadUserByUsername(user.getUsername()) != null) {
//            hashmap for the outer container of errors
            HashMap<String,Object> errorContainer = new HashMap<>();
//            hashmap containing the errors details
            HashMap<String,Object> errorDetails = new HashMap<>();
//            array list for the fields that have errors
            List<String> fieldsWithErrors = new ArrayList<>();
//            provides error code as well as a list of the fields with errors
            errorDetails.put("errorType", "PARTIAL_INFORMATION");
            errorContainer.put("ErrorId", "404API");
            List<String> errorMessages = new ArrayList<>();

//            loops through the errors and adds them to the arraylist
                if (!user.getPassword().equals(user.getConfirmPassword())){
                    errorsTypeAndValues.add("confirmPassword");
                }
                if (userService.loadUserByUsername(user.getUsername()) != null){
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
                if (user.getRole() == Role.COMPANY){
                    Company user1 = new Company();
                    user1.setUsername(user.getUsername());
                    user1.setAddress(user.getAddress());
                    user1.setCompanyName(user.getCompany_name());
                    user1.setConfirmPassword(user.getConfirmPassword());
                    user1.setPassword(user.getPassword());
                    user1.setPhone(user.getPhone());
                    user1.setName(user.getName());
                    user1.setRole(user.getRole());
                    companyService.saveOrUpdate(user1);
                }else if (user.getRole() == Role.USER){
                    User user1 = new User();
                    user1.setUsername(user.getUsername());
                    user1.setAddress(user.getAddress());
                    user1.setConfirmPassword(user.getConfirmPassword());
                    user1.setPassword(user.getPassword());
                    user1.setPhone(user.getPhone());
                    user1.setName(user.getName());
                    user1.setRole(user.getRole());
                    userService.saveOrUpdateUser(user1);
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


//    retrieve form params
//    @PostMapping(value = "/login")
//    public ResponseEntity<?> authenticateUser(@RequestBody User user) {
////        ensures
//        if (user.getUsername() != null && user.getPassword() != null) {
//            if (userService.authenticateUser(user.getUsername(), user.getPassword())) {
//                User user1 = userService.getAuthenticatedUser(user.getUsername());
//                return new ResponseEntity<User>(user1, HttpStatus.OK);
//            } else {
//                return new ResponseEntity<Boolean>(Boolean.FALSE, HttpStatus.BAD_REQUEST);
//            }
//
//        }
//        return new ResponseEntity<Boolean>(Boolean.FALSE, HttpStatus.BAD_REQUEST);
//
//    }



    @Autowired
    JwtUtil jwtUtil;
    @PostMapping(value = "/login")
    public ResponseEntity<?> createAuthenticationRequest(@RequestBody AuthenticationRequest authenticationRequest)  {
//        checks that the relevant fields are filled out
        if (authenticationRequest.getUsername() != null && authenticationRequest.getPassword() != null) {
//            authenticates the given data with the database
            if (userService.authenticateUser(authenticationRequest.getUsername(), authenticationRequest.getPassword())) {
//                if details match, retrieve the user
                final UserDetails user = userService.loadUserByUsername(
                        authenticationRequest.getUsername());
//                generate token
                final String jwt = jwtUtil.generateToken((User) user);
//                respond wih token
                return ResponseEntity.ok(new AuthenticationResponse(jwt));
            } else {
                return ResponseEntity.badRequest().body("Invalid username and password");

            }

        } else {
            return ResponseEntity.badRequest().body("Please enter a username and password");

        }
    }
}
