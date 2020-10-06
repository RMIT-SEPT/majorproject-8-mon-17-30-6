package com.rmit.sept.project.agme.repositories;

import com.rmit.sept.project.agme.model.Company;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends CrudRepository<Company, Long> {

}
