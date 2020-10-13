package com.rmit.sept.project.agme.services;
import com.rmit.sept.project.agme.model.HelpRequest;
import org.springframework.stereotype.Service;

import javax.validation.constraints.Null;


@Service
public class HelpService {

    private String name;
    private String email;
    private String message;
    private String user;
    private String serviceName;



    //Format user submitted bug
    public String formatMessage(HelpRequest report) {

        String formattedMessage;

        formattedMessage = "A user submitted report has been generated\n\n";
        formattedMessage += "\nAuthenticated User : " + this.user;
        formattedMessage += "\nName : " + this.name;
        formattedMessage += "\nEmail : " + this.email;
        formattedMessage += "\nService : " + this.serviceName;
        formattedMessage += "\n\nMesage Details as Follows\n\n" + this.message;


        return formattedMessage;
    }

}
