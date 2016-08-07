import React, { Component } from 'react'
import { DropdownButton, Dropdown, MenuItem } from 'react-bootstrap';

import './styles.less'
import userImg from "../../common-assets/img/users/1.jpg"

export default class HeaderUserBlock extends Component {
  render() {
    return <div className="header-user">
        <a className="header-user-link dropdown-toggle" href="javascript:void(0)" data-toggle="dropdown">
            <img src={userImg} alt="user 1" className="img-circle header-user-img" />
            <span className="header-user-caption">
                Вітаємо,<br />
                <span className="user-name" title="Генаш Максим Геннадійович">
                    Генаш Максим Геннадійович
                </span>
            </span>
        </a>
        <div className="dropdown-menu header-user-menu">
            <li className="">
                <a href="javascript:void(0)" className="btn-block btn-flat header-user-menu-item btn-logout">
                    Вихід з аккаунта
                    <i className="fa fa-sign-out" />
                </a>
            </li>
        </div>
    </div>
  }
}
