package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.HelpRequest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.mockito.BDDMockito.given;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(BookingService.class)


public class HelpServiceTest {


    @Test
    public void submitAReportWithoutAuth() {
        String formattedMessage =
                "A user submitted report has been generated\n\n" +
                "\nAuthenticated User : Unauthenticated user" +
                "\nName : John Citizen" +
                "\nEmail : John.Citizen@yahoo.com" +
                "\nService : TyreRepair" +
                "\n\nMessage Details as Follows\n\n" +
                "I tried to book in for a service but I couldnt book despite the timeslot being available";

        HelpService helpService = new HelpService();
        HelpRequest report = new HelpRequest();
        report.setUser(null);
        report.setName("John Citizen");
        report.setEmail("John.Citizen@yahoo.com");
        report.setServiceName("TyreRepair");
        report.setMessage("I tried to book in for a service but I couldnt book despite the timeslot being available");

        given(helpService.formatMessage(report)).willReturn(formattedMessage);
    }

    @Test
    public void submitAReport2WithoutAuth() {

        String formattedMessage =
                "A user submitted report has been generated\n\n" +
                        "\nAuthenticated User : Unauthenticated user" +
                        "\nName : Ringo Apple" +
                        "\nEmail : Morwell.Fruiterers@yahoo.com" +
                        "\nService : N/A" +
                        "\n\nMessage Details as Follows\n\n" +
                        "I cannot log in to my user account, It says amazon db connectivity problems";

        HelpService helpService = new HelpService();
        HelpRequest report = new HelpRequest();
        report.setUser(null);
        report.setName("Ringo Apple");
        report.setEmail("Morwell.Fruiterers@yahoo.com");
        report.setServiceName("N/A");
        report.setMessage("I cannot log in to my user account, It says amazon db connectivity problems");

        given(helpService.formatMessage(report)).willReturn(formattedMessage);
    }

    @Test
    public void submitAReportWithAuthUser() {

        String formattedMessage =
                "A user submitted report has been generated\n\n" +
                        "\nAuthenticated User : 123123" +
                        "\nName : Beanie Hatmaker" +
                        "\nEmail : Hatmaker.Beanie@yahoo.com" +
                        "\nService : Back to Health Chiropractics" +
                        "\n\nMessage Details as Follows\n\n" +
                        "I keep getting a 500 error when I try to see my bookings";

        HelpService helpService = new HelpService();
        HelpRequest report = new HelpRequest();
        report.setUser("123123");
        report.setName("Beanie Hatmaker");
        report.setEmail("Hatmaker.Beanie@yahoo.com");
        report.setServiceName("Back to Health Chiropractics");
        report.setMessage("I keep getting a 500 error when I try to see my bookings");


        given(helpService.formatMessage(report)).willReturn(formattedMessage);

    }

    @Test
    public void submitAReportWithAuthUser2() {

        String formattedMessage =
                "A user submitted report has been generated\n\n" +
                        "\nAuthenticated User : 423543" +
                        "\nName : Joey Fatone" +
                        "\nEmail : Spaghetti.And.Meatballs@gmail.com" +
                        "\nService : Ay Tony Pizza" +
                        "\n\nMessage Details as Follows\n\n" +
                        "I can't sort services by Tony Pesto";

        HelpService helpService = new HelpService();
        HelpRequest report = new HelpRequest();
        report.setUser("423543");
        report.setName("Joey Fatone");
        report.setEmail("Spaghetti.And.Meatballs@gmail.com");
        report.setServiceName("Ay Tony Pizza");
        report.setMessage("I can't sort services by Tony Pesto");

        given(helpService.formatMessage(report)).willReturn(formattedMessage);

    }
}
