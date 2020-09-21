package com.rmit.sept.project.agme;

import com.rmit.sept.project.agme.model.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
public class AgmeApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgmeApplication.class, args);
	}
	@PostConstruct
	public void init(){
		// Setting Spring Boot SetTimeZone
		TimeZone.setDefault(TimeZone.getTimeZone("AEST"));
	}
}
