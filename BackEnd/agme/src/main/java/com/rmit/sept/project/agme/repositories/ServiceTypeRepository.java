package com.rmit.sept.project.agme.repositories;

import com.rmit.sept.project.agme.model.ServiceType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface ServiceTypeRepository extends CrudRepository<ServiceType, Long> {
    @Override
    Iterable<ServiceType> findAllById(Iterable<Long> iterable);

    @Override
    Iterable<ServiceType> findAll();
}
