package com.rmit.sept.project.agme.services;
import com.rmit.sept.project.agme.model.HelpRequest;
import org.springframework.stereotype.Service;

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
        formattedMessage += "\nAuthenticated User : " + report.getUser();
        formattedMessage += "\nName : " + report.getName();
        formattedMessage += "\nEmail : " + report.getEmail();
        if(report.getServiceName()!=null)
            formattedMessage += "\nService : " + report.getServiceName();
        formattedMessage += "\n\nMessage Details as Follows\n\n" + report.getMessage();

        return formattedMessage;
    }

}
