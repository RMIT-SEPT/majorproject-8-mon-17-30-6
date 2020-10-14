package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.AvailabilityRequest;
import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.model.ServiceType;
import com.rmit.sept.project.agme.repositories.ServiceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class ServiceTypeService {
    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    @Autowired
    private AvailabilityService availabilityService;

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

    public List<Object> getServiceAvailability(AvailabilityRequest availabilityRequest){
        ServiceType service = loadServiceByName(availabilityRequest.getServiceName());
        List<Object> maps = new ArrayList<>();
        for (Company next: service.getCompany()) {
            if (next.isActive()) {
                for (Employee employee : next.getEmployees()) {
                    HashMap<String, Object> map = new HashMap<>();
                    map.put("name", employee.getName());
                    map.put("username", employee.getUsername());
                    map.put("availability", availabilityService.getAvailabilityForService(employee.getUsername(), availabilityRequest.getDate(), Integer.parseInt(availabilityRequest.getDuration())));
                    maps.add(map);
                }
            }
        }
        return maps;
    }
}