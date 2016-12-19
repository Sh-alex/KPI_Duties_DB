package com.kpi.kpi_duties_db.repository;



import com.kpi.kpi_duties_db.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by Yaroslav on 10.09.2016.
 */
@Repository
public interface PermissionsRepository extends JpaRepository<Permissions, Integer> {

    @Query("select b from Passports b where  b.employee.permissions.login = :name")
    Passports getPassportsByName(@Param("name") String name);

    @Query("select b from Permissions b where  b.login = :username")
    Permissions loadUserByUsername(@Param("username") String username);




//    @Query("select b from PermissionsForProject b  where b.permissions.login = :username")
//    PermissionsForProject getPermissionsForProject(@Param("username") String username);
//
//    @Query("select b from PermissionsForProject b  where b.permissions.login = :username")
//    PermissionsForProject getPermissionsForProject(@Param("username") String username);

}