package com.rmit.sept.project.agme.repositories;

import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface CompanyRepository extends CrudRepository<Company, Long> {
    @Override
    Iterable<Company> findAllById(Iterable<Long> iterable);

    @Override
    Iterable<Company> findAll();
}
