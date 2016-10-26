import React, {Component} from "react";
import { reduxForm } from 'redux-form';
import classNames from "classnames";
import { Alert } from 'react-bootstrap'

import LoginBoxBody from "../LoginBoxBody";

import "./styles.less";

import {
    clearLogInError,
    logInUser
} from "../../actions/user"

class LoginBoxAuthForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var elClassName = classNames([LoginBoxBody.className, "loginUser-box-body--auth-form-wrapper"]),
            errorMsg = this.props.user.loginError || this.props.user.getUserInfoError,
            errorAlert = errorMsg && (
                    <Alert bsStyle="danger" onDismiss={this.props.handleServerRespMsgDismiss}>
                        <h4>
                            <i className="icon fa fa-warning" />
                            Помилка! :(
                        </h4>
                        <p>
                            { errorMsg }
                        </p>
                    </Alert>
                ) || "",
            isLoading = this.props.user.isLoggingIn || this.props.user.isGettingUserInfo,
            loginFormGroupClass = classNames({
                'form-group': true,
                'has-error':  this.props.fields.login.touched && this.props.fields.login.error,
                'has-success': this.props.fields.login.touched && !this.props.fields.login.error
            }),
            passFormGroupClass = classNames({
                'form-group': true,
                'has-error':  this.props.fields.pass.touched && this.props.fields.pass.error,
                'has-success': this.props.fields.pass.touched && !this.props.fields.pass.error
            }),
            submitBtnSpinnerClass = classNames({
                "btn-spinner": true,
                "hidden": !isLoading
            });

        return (
            <LoginBoxBody {...this.props} className={elClassName}>
                <p className="login-box-msg">
                    Авторизуйтесь для початку роботи із сервісом
                </p>

                <form id="auth-form" onSubmit={this.props.handleSubmit} className="auth-form" role="form">
                    <div className={loginFormGroupClass}>
                        <div className="input-group">
                            <span className="input-group-addon"> <i className="icon-append fa fa-user" /> </span>
                            <input
                                {...this.props.fields.login}
                                type="email"
                                className="form-control"
                                id="auth-form-login"
                                name="login"
                                placeholder="Логін" />
                        </div>
                        <span className="help-block">
                            { this.props.fields.login.touched && this.props.fields.login.error }
                        </span>
                    </div>
                    <div className={passFormGroupClass}>
                        <div className="input-group">
                            <span className="input-group-addon"> <i className="icon-append fa fa-lock" /> </span>
                            <input
                                {...this.props.fields.pass}
                                type="password"
                                className="form-control"
                                id="auth-form-pass"
                                name="pass"
                                placeholder="Пароль" />
                        </div>
                        <span className="help-block">
                            { this.props.fields.pass.touched && this.props.fields.pass.error }
                        </span>
                    </div>
                    <div className="form-group">
                        { errorAlert }
                    </div>
                    <div className="form-group text-right">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="btn btn-primary btn-flat auth-form-submit-btn"
                        >
                            <span className="btn-label"> Увійти </span>
                            <span className={submitBtnSpinnerClass} >
                                <i className="fa fa-spinner fa-pulse" />
                            </span>
                        </button>
                    </div>
                </form>

            </LoginBoxBody>
        );
    }
}


function validateLogInForm(formFields, props) {
    var errors = {};
    if(!formFields.login)
        errors.login = "Це поле є обов'язковим!";
    // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formFields.login))  //!!!! Змінити регулярний вираз
    //     errors.login = 'Некорректна Е-mail адреса';

    if(!formFields.pass)
        errors.pass = "Це поле є обов'язковим!";

    return errors;
}

export default reduxForm(
    {
        form: 'logInForm',
        fields: [
            'login',
            'pass'
        ],
        validate: validateLogInForm,
        onSubmit: logInUser
    },
    (state, ownProps) => {    //mapStateToProps
        return {
            user: state.user,
        }
    },
    (dispatch, ownProps) => { //mapDispatchToProps
        return {
            //logInUser: userData => dispatch(logInUser(userData)),
            handleServerRespMsgDismiss: () => dispatch( clearLogInError() )
        }
    }
)(LoginBoxAuthForm);