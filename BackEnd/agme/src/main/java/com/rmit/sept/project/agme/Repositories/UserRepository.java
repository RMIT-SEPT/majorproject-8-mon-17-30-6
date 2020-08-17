package com.rmit.sept.project.agme.Repositories;

import com.rmit.sept.project.agme.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    @Override
    Iterable<User> findAllById(Iterable<Long> iterable);
}
