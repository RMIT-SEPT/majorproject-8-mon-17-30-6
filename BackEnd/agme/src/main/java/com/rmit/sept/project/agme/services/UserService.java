package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    //injecting user repository access
    @Autowired
    private UserRepository userRepository;

    @Autowired
    BookingService bookingService;
    public UserService() {

    }

    public User saveOrUpdateUser(User user) {

        return userRepository.save(user);
    }

    //    Retrieve list of users
    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        Iterable<User> aa = userRepository.findAll();
        aa.forEach(users::add);
        return users;
    }

    public boolean authenticateUser(String username, String passwordHash) {
//        Retrieve users
        List<User> users = getAllUsers();
//        Interate through users to check if the usr matches the username
        for (User next : users) {
            if (username.equals(next.getUsername())) {
//                If User is found, encode password with users salt
//                check if the passwords match, if so return true, else false
//                if (passwordEncoder.matches(passwordHash, next.getPassword())){
                return BCrypt.checkpw(passwordHash, next.getPassword());
            }
        }
        return false;
    }


    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
//        Retrieve users
        List<User> users = getAllUsers();
        User returnVal = null;
        s = s.toLowerCase();

//        Interate through users to check if the usr matches the username
        for (User next : users) {
            if (s.equals(next.getUsername().toLowerCase())) {
                returnVal = next;
            }
        }
        return returnVal;
    }
    @Autowired
    EmailServiceImpl emailService;

    public void sendReminderEmails()
    {
        List<Booking> bookings = bookingService.getAllBookings();
        Date today = new Date();
        long currentDateMilliSec = today.getTime();
        long updateDateMilliSec;
        long diffDays;
        for (Booking next:bookings){
             updateDateMilliSec = next.getStartDateTime().getTime();
             diffDays = (updateDateMilliSec-currentDateMilliSec) / (24 * 60 * 60 * 1000);
            if ((diffDays <= 1)&&(!next.isReminderSent())&&next.getUser().getEmail() !=null){
                emailService.sendSimpleMessage(next.getUser().getEmail(), "Upcoming booking", "Just a reminder, you have an upcoming " +
                        "booking on " + next.getStartDateTime() + '.');
                next.setReminderSent(true);
                bookingService.addBooking(next);
            }

        }
    }
}
