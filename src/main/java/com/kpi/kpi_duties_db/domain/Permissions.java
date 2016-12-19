package com.kpi.kpi_duties_db.domain;
import org.codehaus.jackson.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

/**
 * Created by Yaroslav on 31.10.2016.
 */
@Entity
public class Permissions {
    private int id;
    private int idEmployee;
    private String login;
    private String password;
    private boolean actuality;
    private String loginSql;
    private String passwordSql;
    private String salt;
    private String keypass;
    private String initialvector;
    private PermissionsForProject permissionForProjects;


    private Employees2 employees2;

    @OneToOne( mappedBy = "permission")
    public PermissionsForProject getPermissionForProjects() {
        return permissionForProjects;
    }

    public void setPermissionForProjects(PermissionsForProject permissionForProjects) {
        this.permissionForProjects = permissionForProjects;
    }

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(name = "id_employee")
    public int getIdEmployee() {
        return idEmployee;
    }


    public void setIdEmployee(int idEmployee) {
        this.idEmployee = idEmployee;
    }

    @Basic
    @Column(name = "login")
    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    @Basic
    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "actuality")
    public boolean isActuality() {
        return actuality;
    }

    public void setActuality(boolean actuality) {
        this.actuality = actuality;
    }

    @Basic
    @Column(name = "login_sql")
    public String getLoginSql() {
        return loginSql;
    }

    public void setLoginSql(String loginSql) {
        this.loginSql = loginSql;
    }

    @Basic
    @Column(name = "password_sql")
    public String getPasswordSql() {
        return passwordSql;
    }

    public void setPasswordSql(String passwordSql) {
        this.passwordSql = passwordSql;
    }

    @Basic
    @Column(name = "salt")
    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    @Basic
    @Column(name = "keypass")
    public String getKeypass() {
        return keypass;
    }

    public void setKeypass(String keypass) {
        this.keypass = keypass;
    }

    @Basic
    @Column(name = "initialvector")
    public String getInitialvector() {
        return initialvector;
    }

    public void setInitialvector(String initialvector) {
        this.initialvector = initialvector;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Permissions that = (Permissions) o;

        if (id != that.id) return false;
        if (idEmployee != that.idEmployee) return false;
        if (actuality != that.actuality) return false;
        if (login != null ? !login.equals(that.login) : that.login != null) return false;
        if (password != null ? !password.equals(that.password) : that.password != null) return false;
        if (loginSql != null ? !loginSql.equals(that.loginSql) : that.loginSql != null) return false;
        if (passwordSql != null ? !passwordSql.equals(that.passwordSql) : that.passwordSql != null) return false;
        if (salt != null ? !salt.equals(that.salt) : that.salt != null) return false;
        if (keypass != null ? !keypass.equals(that.keypass) : that.keypass != null) return false;
        if (initialvector != null ? !initialvector.equals(that.initialvector) : that.initialvector != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + idEmployee;
        result = 31 * result + (login != null ? login.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (actuality ? 1 : 0);
        result = 31 * result + (loginSql != null ? loginSql.hashCode() : 0);
        result = 31 * result + (passwordSql != null ? passwordSql.hashCode() : 0);
        result = 31 * result + (salt != null ? salt.hashCode() : 0);
        result = 31 * result + (keypass != null ? keypass.hashCode() : 0);
        result = 31 * result + (initialvector != null ? initialvector.hashCode() : 0);
        return result;
    }

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_employee", insertable = false, updatable = false)
    @JsonIgnore
    public Employees2 getEmployees2() {
        return employees2;
    }


    public void setEmployees2(Employees2 employees2) {
        this.employees2 = employees2;
    }




}
