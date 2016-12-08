import React, {Component} from "react";
import classnames from "classnames";
import NavLink from "../NavLink";
import LoginBoxBody from "../LoginBoxBody";
import { Alert } from 'react-bootstrap'
import "./styles.less";

export default function LoginBoxNav(props) {
    let elClassName = classnames([LoginBoxBody.className, "loginUser-box-body--nav"]),
        userName = props.user && props.user.userName || "Шановний користувач",
        userHasAccessToCtrlDcPage = props.user.isAuthenticated &&
            props.user.permissions &&
            props.user.permissions.forms &&
            props.user.permissions.forms.ctrlDc &&
            props.user.permissions.forms.ctrlDc.show,
        userHasAccessToSearchPage = props.user.isAuthenticated &&
            props.user.permissions &&
            props.user.permissions.forms &&
            props.user.permissions.forms.searchOccupations &&
            props.user.permissions.forms.searchOccupations.show,
        userHasAccessToAddPage = props.user.isAuthenticated &&
            props.user.permissions &&
            props.user.permissions.forms &&
            props.user.permissions.forms.addNewOccupations &&
            props.user.permissions.forms.addNewOccupations.show,
        errorMsg = props.user.accessError,
        ErrorAlert = errorMsg && (
            <Alert bsStyle="danger" onDismiss={props.clearUserAccessError}>
                <h4>
                    <i className="icon fa fa-warning" />
                    Помилка! :(
                </h4>
                <p> { errorMsg } </p>
            </Alert>
        ) || "";

    return (
        <LoginBoxBody {...props} className={elClassName}>
            <p className="login-box-msg">
                Доброго дня, {userName}!
            </p>
            <div className="list-group text-center">
                {
                    userHasAccessToAddPage && (
                        <NavLink to="/add" className="list-group-item">
                            <i className="fa fa-plus"/> {" "}
                            Додати нову посаду
                        </NavLink>
                    ) || ""
                }
                {
                    userHasAccessToSearchPage && (
                        <NavLink to="/search" className="list-group-item">
                            <i className="fa fa-search" /> {" "}
                            Пошук посад
                        </NavLink>
                    ) || ""
                }
                {
                    userHasAccessToCtrlDcPage && (
                        <NavLink to="/ctrldict" className="list-group-item">
                            <i className="fa fa-book" /> {" "}
                            Контроль списків
                        </NavLink>
                    ) || ""
                }
                <a
                    onClick={props.logOutUser}
                    href="javascript:void(0)"
                    className="list-group-item btn-logout"
                >
                    <i className="fa fa-sign-out"/> {" "}
                    Вихід з аккаунта
                </a>
            </div>
            { ErrorAlert }
        </LoginBoxBody>
    )
}
