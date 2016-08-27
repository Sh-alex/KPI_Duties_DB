import React, { Component } from 'react'
import classnames from 'classnames'
import NavLink from '../NavLink'
import LoginBoxBody from '../LoginBoxBody'
import './styles.less'

export default class LoginBoxNav extends Component {
  render() {
    var elClassName = classnames([LoginBoxBody.className, "login-box-body--nav"]);
//      return <LoginBoxBody className="login-box-body--nav">
      return <LoginBoxBody {...this.props} className={elClassName}>
        <p className="login-box-msg">
            Доброго дня, Генаш Максим!
        </p>
        <div className="list-group text-center">
            <NavLink to="/add" className="list-group-item">
                <i className="fa fa-plus" aria-hidden="true" />
                Додати нову посаду
            </NavLink>
            <NavLink to="/search" className="list-group-item">
                <i className="fa fa-search" aria-hidden="true" />
                Пошук посад
            </NavLink>
            <a href="javascript:void(0)" className="list-group-item btn-logout">
                <i className="fa fa-sign-out" />
                Вихід з аккаунта
            </a>
        </div>
    </LoginBoxBody>
  }
}
