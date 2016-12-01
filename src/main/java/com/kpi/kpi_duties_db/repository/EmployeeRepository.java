package com.kpi.kpi_duties_db.repository;


import com.kpi.kpi_duties_db.domain.Employees2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Created by Yaroslav on 31.10.2016.
 */
public interface EmployeeRepository extends JpaRepository<Employees2, Integer> {

    @Query("select t from Employees2 t where t.permissions.login = :name")
    Employees2 getEmployeeByName(@Param("name") String name);

}
