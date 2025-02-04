package com.rmit.sept.project.agme.repositories;

import com.rmit.sept.project.agme.model.Booking;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends CrudRepository<Booking, Long> {

}
