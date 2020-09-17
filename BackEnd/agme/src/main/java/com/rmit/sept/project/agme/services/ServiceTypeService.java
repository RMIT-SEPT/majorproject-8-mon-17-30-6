package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.model.ServiceType;
import com.rmit.sept.project.agme.repositories.ServiceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceTypeService {
    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    public ServiceType saveOrUpdateServiceType(ServiceType serviceType){
        return serviceTypeRepository.save(serviceType);
    }

    public List<ServiceType> getAllServices() {
        Iterable<ServiceType> it = serviceTypeRepository.findAll();
        List<ServiceType> services = new ArrayList<>();
        it.forEach(services::add);

        return services;
    }

    public ServiceType loadServiceByName(String name){
        List<ServiceType> services = getAllServices();
        for (ServiceType next:services){
            if (next.getName().equals(name)){
                return next;
            }
        }
        return null;
    }
}