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

//
//    @Query("select t from Employee2 t where t.passports.permissions.login = :username ")
//    Employees2 getEmployeeByName(@Param("username") String username);

}



/*

  select t2.Name, t2.Surname from Permissions_zhenya.dbo.Permissions as t1
        join inform.dbo.Passports as t2
        on t1.id_employee = t2.ID_Employee_Owner where t1.login = 'bill'

*/