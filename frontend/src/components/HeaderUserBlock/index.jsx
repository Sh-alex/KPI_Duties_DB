import React, {Component} from "react";
import "./styles.less";
import { Popover, OverlayTrigger } from 'react-bootstrap'
import { Link } from 'react-router'
import NavLink from "../NavLink"

function HeaderUserMenu(props) {
    let accessNameText = props.userState && props.userState.permissions && props.userState.permissions.accessName || "Невідомо";
    return (
        <Popover className="dropdown-menu header-user-menu" >
            {/*<div className="dropdown-menu header-user-menu">*/}
            <li className="dropdown-header no-padding">
                <h5 className="no-margin"> Права доступу: </h5>
                <i> {accessNameText} </i>
            </li>
            <li role="separator" className="divider" />
            <li className="">
                <NavLink to="/help" className="btn-block btn-flat header-user-menu-item" title="Керівництво користувачу">
                    Допомога {" "}
                    <i className="fa fa-question-circle" />
                </NavLink>
            </li>
            <li role="separator" className="divider" />
            <li className="">
                <NavLink to="/about" className="btn-block btn-flat header-user-menu-item" title="Переглянути інформацію про програму" >
                    Про програму {" "}
                    <i className="fa fa-info-circle" />
                </NavLink>
            </li>
            <li role="separator" className="divider" />
            <li className="">
                <a
                    href="javascript:void(0)"
                    className="btn-block btn-flat header-user-menu-item btn-logout"
                    onClick={props.logOutUser}
                >
                    Вихід з аккаунта {" "}
                    <i className="fa fa-sign-out" />
                </a>
            </li>
            {/*</div>*/}
        </Popover>
    );
}

export default function HeaderUserBlock(props) {
    let UserAvatarImg = props.userState.userAvatar ? (
            <img
                src={props.userState.userAvatar}
                alt={`Фото користувача ${props.userState.userName || ""}`}
                className="img-circle header-user-img" />
        ) : (
            <span className="fa-stack fa-2x header-user-img--without-photo">
                <i className="fa fa-circle fa-stack-2x fa-inverse" />
                <i className="fa fa-user fa-stack-1x"/>
            </span>
        ),
        userName = props.userState.userName || "Шановний користувач";

    return (
        <div className="header-user">
            <div className="header-user-inner">
                <OverlayTrigger trigger={['click']}  rootClose placement="bottom" overlay={HeaderUserMenu(props)}>
                    <a className="header-user-link dropdown-toggle" href="javascript:void(0)">
                        {UserAvatarImg}
                        <span className="header-user-caption">
                            Вітаємо,<br />
                            <span className="user-name" title={userName}>
                                {userName}
                            </span>
                        </span>
                    </a>
                </OverlayTrigger>
            </div>
        </div>
    )
}


