import React, {Component} from "react";
import { connect } from 'react-redux'
import LoginBoxLogo from "../LoginBoxLogo";
import LoginBoxAuthForm from "../LoginBoxAuthForm";
import LoginBoxNav from "../LoginBoxNav";

import "./styles.less";

import {
    login,
    logout
} from "../../actions/user"


function LoginBox(props) {
    let loginBoxBody = props.userState.isAuthenticated ? (
        <LoginBoxNav
            logOutUser={props.logOutUser}
        />
    ) : (
        <LoginBoxAuthForm
            logInUser={props.logInUser}
            isLoggingIn={props.userState.isLoggingIn}
            loginError={props.userState.loginError}
        />
    );

    return (
        <div className="login-page login-box-wrapper">
            <div className="box box-primary login-box">
                <LoginBoxLogo />
                { loginBoxBody }
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        userState: state.user
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logInUser: userData => dispatch(login(userData)),
        logOutUser: () => dispatch(logout())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginBox);

