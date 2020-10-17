package com.rmit.sept.project.agme.repositories;

import com.rmit.sept.project.agme.model.Admin;
import org.springframework.data.repository.CrudRepository;

public interface AdminRepository extends CrudRepository<Admin, Long>

{
    @Override
    Iterable<Admin> findAllById(Iterable<Long> iterable);

    @Override
    Iterable<Admin> findAll();
}

