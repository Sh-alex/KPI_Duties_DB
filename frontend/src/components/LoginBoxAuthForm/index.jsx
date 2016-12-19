import React, {Component} from "react";
import { reduxForm } from 'redux-form';
import classNames from "classnames";
import { Alert } from 'react-bootstrap'

import LoginBoxBody from "../LoginBoxBody";

import "./styles.less";

import { logInUser } from "../../actions/user"

class LoginBoxAuthForm extends Component {
    render() {
        var elClassName = classNames([LoginBoxBody.className, "loginUser-box-body--auth-form-wrapper"]),
            errorMsg = this.props.user.loginError || this.props.user.getUserInfoError || this.props.user.accessError,
            ErrorAlert = errorMsg && (
                    <Alert bsStyle="danger" onDismiss={this.props.clearLogInError}>
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
                'has-error':  this.props.fields.username.touched && this.props.fields.username.error,
                'has-success': this.props.fields.username.touched && !this.props.fields.username.error
            }),
            passFormGroupClass = classNames({
                'form-group': true,
                'has-error':  this.props.fields.password.touched && this.props.fields.password.error,
                'has-success': this.props.fields.password.touched && !this.props.fields.password.error
            }),
            submitBtnSpinnerClass = classNames({
                "btn-spinner": true,
                "hidden": !isLoading
            });

        return (
            <LoginBoxBody {...this.props} className={elClassName}>
                <p className="login-box-msg">
                    Авторизуйтесь для початку роботи із системою
                </p>

                <form id="auth-form" onSubmit={this.props.handleSubmit} className="auth-form" role="form">
                    <div className={loginFormGroupClass}>
                        <div className="input-group">
                            <span className="input-group-addon"> <i className="icon-append fa fa-user" /> </span>
                            <input
                                {...this.props.fields.username}
                                type="text"
                                className="form-control"
                                id="auth-form-login"
                                name="username"
                                placeholder="Логін" />
                        </div>
                        <span className="help-block">
                            { this.props.fields.username.touched && this.props.fields.username.error }
                        </span>
                    </div>
                    <div className={passFormGroupClass}>
                        <div className="input-group">
                            <span className="input-group-addon"> <i className="icon-append fa fa-lock" /> </span>
                            <input
                                {...this.props.fields.password}
                                type="password"
                                className="form-control"
                                id="auth-form-pass"
                                name="password"
                                placeholder="Пароль" />
                        </div>
                        <span className="help-block">
                            { this.props.fields.password.touched && this.props.fields.password.error }
                        </span>
                    </div>
                    <div className="form-group">
                        { ErrorAlert }
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
    if(!formFields.username)
        errors.username = "Це поле є обов'язковим!";
    // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formFields.username))  //!!!! Змінити регулярний вираз
    //     errors.username = 'Некорректна Е-mail адреса';

    if(!formFields.password)
        errors.password = "Це поле є обов'язковим!";

    return errors;
}

export default reduxForm(
    {
        form: 'logInForm',
        fields: [
            'username',
            'password'
        ],
        validate: validateLogInForm,
        onSubmit: logInUser
    },
    // (state, ownProps) => {    //mapStateToProps
    //     return {
    //
    //     }
    // },
    // (dispatch, ownProps) => { //mapDispatchToProps
    //     return {
    //
    //     }
    // }
)(LoginBoxAuthForm);