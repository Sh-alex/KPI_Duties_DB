import React, { Component } from 'react'
import classnames from 'classnames'
import LoginBoxBody from '../LoginBoxBody'
import './styles.less'

export default class LoginBoxAuthForm extends Component {
  render() {
    var elClassName = classnames([LoginBoxBody.className, "login-box-body--auth-form-wrapper"]);
    return (<LoginBoxBody {...this.props} className={elClassName}>
        <p className="login-box-msg">
            Авторизуйтесь для початку роботи із сервісом
        </p>

        <form id="auth-form" action="/api/auth" method="post" className="auth-form" role="form">
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-addon"> <i className="icon-append fa fa-user" /> </span>
                    <input type="email" className="form-control" id="auth-form-login" name="login" placeholder="Логін" />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-addon"> <i className="icon-append fa fa-lock" /> </span>
                    <input type="password" className="form-control" id="auth-form-pass" name="pass" placeholder="Пароль" />
                </div>
            </div>
            <div className="form-group text-right">
                <button type="submit" className="btn btn-primary btn-flat auth-form-submit-btn">
                    <span className="btn-label"> Увійти </span>
                    <span className="btn-spinner"> <i className="fa fa-spinner fa-pulse" /> </span>
                </button>
            </div>
        </form>

    </LoginBoxBody>);
  }
}
