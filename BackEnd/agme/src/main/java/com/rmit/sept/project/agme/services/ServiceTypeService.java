package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.ServiceType;
import com.rmit.sept.project.agme.repositories.ServiceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceTypeService {
    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    public ServiceType saveOrUpdateServiceType(ServiceType serviceType){
        return serviceTypeRepository.save(serviceType);
    }
}