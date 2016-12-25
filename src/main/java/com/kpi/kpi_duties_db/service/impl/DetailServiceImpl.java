package com.kpi.kpi_duties_db.service.impl;//package com.example.service.impl;


import com.kpi.kpi_duties_db.domain.Employees2;
import com.kpi.kpi_duties_db.domain.Passports;
import com.kpi.kpi_duties_db.repository.EmployeeRepository;
import com.kpi.kpi_duties_db.repository.PermissionsRepository;
import com.kpi.kpi_duties_db.service.DetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * Created by Yaroslav on 31.10.2016.
 */
//TODO: Yaroslav, check this class
@Service
public class DetailServiceImpl implements DetailService {

    @Autowired
    private PermissionsRepository permissionsRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employees2 getEmployeeByName(String username) {
        return employeeRepository.getEmployeeByName(username);
    }

    @Override
    public Passports getPassportsByName(String name) {
        return permissionsRepository.getPassportsByName(name);
    }


    @Override
    public Passports add(Passports entity) {
        return null;
    }

    @Override
    public List<Passports> add(List<Passports> entity) {
        return null;
    }

    @Override
    public void delete(Integer id) {

    }

    @Override
    public void delete(List<Passports> entity) {

    }

    @Override
    public Passports update(Passports entity) {
        return null;
    }

    @Override
    public List<Passports> update(List<Passports> entity) {
        return null;
    }

    @Override
    public Passports getById(Integer id) {
        return null;
    }

    @Override
    public List<Passports> getAll() {
        return null;
    }
}