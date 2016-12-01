package com.kpi.kpi_duties_db.repository;



import com.kpi.kpi_duties_db.domain.Employees2;
import com.kpi.kpi_duties_db.domain.Passports;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Created by Yaroslav on 10.09.2016.
 */
@Repository
public interface PermissionsRepository extends JpaRepository<Employees2, Integer> {

    @Query("select b from Passports b where  b.employee.permissions.login = :name")
    Passports getPassportsByName(@Param("name") String name);

}