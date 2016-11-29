import React, {Component} from "react";
import classnames from "classnames";
import NavLink from "../NavLink";
import LoginBoxBody from "../LoginBoxBody";
import "./styles.less";

export default function LoginBoxNav(props) {
    let elClassName = classnames([LoginBoxBody.className, "loginUser-box-body--nav"]),
        userName = props.userName || "Шановний користувач";
    return (
        <LoginBoxBody {...props} className={elClassName}>
            <p className="login-box-msg">
                Доброго дня, {userName}!
            </p>
            <div className="list-group text-center">
                <NavLink to="/add" className="list-group-item">
                    <i className="fa fa-plus" />
                    Додати нову посаду
                </NavLink>
                <NavLink to="/search" className="list-group-item">
                    <i className="fa fa-search" />
                    Пошук посад
                </NavLink>
                <NavLink to="/search" className="list-group-item">
                    <i className="fa fa-book" />
                    Контроль списків
                </NavLink>
                <a
                    onClick={props.logOutUser}
                    href="javascript:void(0)"
                    className="list-group-item btn-logout"
                >
                    <i className="fa fa-sign-out"/>
                    Вихід з аккаунта
                </a>
            </div>
        </LoginBoxBody>
    )
}
