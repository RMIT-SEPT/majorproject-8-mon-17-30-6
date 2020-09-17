package com.rmit.sept.project.agme.web;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@CrossOrigin("http://localhost:3000")
public class HealthCheckController {

    @GetMapping("/healthcheck")
    public ResponseEntity<?> healthcheck() {
        return new ResponseEntity<>("Server is alive.", HttpStatus.OK);
    }
}
