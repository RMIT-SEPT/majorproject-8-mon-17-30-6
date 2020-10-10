package com.rmit.sept.project.agme.repositories;

import com.rmit.sept.project.agme.model.Admin;
import com.rmit.sept.project.agme.model.Booking;
import org.springframework.data.repository.CrudRepository;

public interface AdminRepository extends CrudRepository<Admin, Long>

{

}
