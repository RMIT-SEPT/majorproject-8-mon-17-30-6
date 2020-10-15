package com.rmit.sept.project.agme.web;
import com.rmit.sept.project.agme.model.HelpRequest;
import com.rmit.sept.project.agme.services.EmailServiceImpl;
import com.rmit.sept.project.agme.services.HelpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.rmit.sept.project.agme.security.JwtUtil;


@RestController
@RequestMapping("/help")
@CrossOrigin(origins = "*")
public class HelpController {

    @Autowired
    HelpService helpService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    EmailServiceImpl emailService;
    @PostMapping
    public ResponseEntity<?> reportIssue(@RequestHeader("Authorisation") String authorisationHeader,@RequestBody HelpRequest report) {

        try {
            ;
//        Extract user from token
            String username = jwtUtil.extractUsername(authorisationHeader);

            if(username!=null){
                report.setUser(username);
            }else{
                report.setUser("Unauthorized User");
            }

            //Admin group email
            String sysAdminEmail = "Admin.mailbox@agme.com";

            emailService.sendSimpleMessage(sysAdminEmail, "Bug Report/Help Request", helpService.formatMessage(report));
            return new ResponseEntity<>("Report Submitted Successfully",HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>("Could not Submit Report", HttpStatus.valueOf(404));
        }
    }
}