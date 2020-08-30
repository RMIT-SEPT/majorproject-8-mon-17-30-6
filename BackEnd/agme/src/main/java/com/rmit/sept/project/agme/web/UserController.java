package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.AuthenticationRequest;
import com.rmit.sept.project.agme.model.AuthenticationResponse;
import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.security.JwtUtil;
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

@RestController
@RequestMapping("")
@CrossOrigin("http://localhost:3000")
public class UserController {
//
//    inject User service
    @Autowired
    private UserService userService;

//    signup authentication
    @PostMapping("/signup")
    public ResponseEntity<?> createdNewUser(@Valid @RequestBody User user, BindingResult result) {
//        validates form data to ensure all criteria is met
        if (result.hasErrors()){
//            hashmap for the outer container of errors
            HashMap<String,Object> errorContainer = new HashMap<>();
//            hashmap containing the errors details
            List<HashMap<String,Object>> errorDetails = new ArrayList<>();
//            array list for the fields that have errors
            List<String> fieldsWithErrors = new ArrayList<>();
//            provides error code as well as a list of the fields with errors
            HashMap<String,Object> errorsTypeAndValues = new HashMap<>();
            errorsTypeAndValues.put("errorType", "PARTIAL_INFORMATION");
            errorContainer.put("ErrorId", "404API");

//            loops through the errors and adds them to the arraylist
            for (FieldError error: result.getFieldErrors()){
//                return new ResponseEntity<List<FieldError>>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
                fieldsWithErrors.add(error.getField());
            }

            errorsTypeAndValues.put("missingFields", fieldsWithErrors);
            errorDetails.add(errorsTypeAndValues);
            errorContainer.put("errorDetails", errorDetails);
//            returns JSON response with error details
            return new ResponseEntity<>(errorContainer, HttpStatus.OK);
        }


//         validation to ensure user does not exist and all details are filled out
        if (userService.loadUserByUsername(user.getUsername()) == null) {
//            ensure password is equal to the confirmPassword field
            if (user.getPassword().equals(user.getConfirmPassword())) {
//            hash the password before storing
                user.hashPassword();
//            store user with hashed password in database
                User user1 = userService.saveOrUpdateUser(user);
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
