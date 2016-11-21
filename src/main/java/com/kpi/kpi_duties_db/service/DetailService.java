package com.kpi.kpi_duties_db.service;


import com.kpi.kpi_duties_db.domain.Employees2;
import com.kpi.kpi_duties_db.domain.Passports;

/**
 * Created by Yaroslav on 31.10.2016.
 */
public interface DetailService extends BaseService<Passports> {

     Employees2 getEmployeeByName(String username);

     Passports getPassportsByName(String name);
}
