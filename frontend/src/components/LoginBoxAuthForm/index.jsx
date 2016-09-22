import React, {Component} from "react";
import classnames from "classnames";
import LoginBoxBody from "../LoginBoxBody";
import "./styles.less";

export default class LoginBoxAuthForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginFieldVal: "",
            passFieldVal: ""
        };

        this.handleLoginBtnClick = this.handleLoginBtnClick.bind(this);
        this.handleLoginFieldChange = this.handleLoginFieldChange.bind(this);
        this.handlePassFieldChange = this.handlePassFieldChange.bind(this);
    }

    handleLoginBtnClick (e) {
        e.preventDefault();
        this.props.logInUser({
            login: this.state.loginFieldVal,
            pass: this.state.passFieldVal
        });
    }

    handleLoginFieldChange(e) {
        this.setState({ loginFieldVal: e.currentTarget.value });
    }

    handlePassFieldChange(e) {
        this.setState({ passFieldVal: e.currentTarget.value });
    }

    render() {
        var elClassName = classnames([LoginBoxBody.className, "login-box-body--auth-form-wrapper"]);
        return (
            <LoginBoxBody {...this.props} className={elClassName}>
                <p className="login-box-msg">
                    Авторизуйтесь для початку роботи із сервісом
                </p>

                <form id="auth-form" action="/api/auth" method="post" className="auth-form" role="form">
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"> <i className="icon-append fa fa-user" /> </span>
                            <input
                                value={this.state.loginFieldVal}
                                onChange={this.handleLoginFieldChange}
                                type="email"
                                className="form-control"
                                id="auth-form-login"
                                name="login"
                                placeholder="Логін" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"> <i className="icon-append fa fa-lock" /> </span>
                            <input
                                value={this.state.passFieldVal}
                                onChange={this.handlePassFieldChange}
                                type="password"
                                className="form-control"
                                id="auth-form-pass"
                                name="pass"
                                placeholder="Пароль" />
                        </div>
                    </div>
                    <div className="form-group text-right">
                        <button
                            onClick={this.handleLoginBtnClick}
                            type="submit"
                            className="btn btn-primary btn-flat auth-form-submit-btn"
                        >
                            <span className="btn-label"> Увійти </span>
                            <span className={classnames({"btn-spinner": true, "hidden": !this.props.isLoggingIn })} >
                                <i className="fa fa-spinner fa-pulse" />
                            </span>
                        </button>
                    </div>
                </form>

            </LoginBoxBody>
        );
    }
}
