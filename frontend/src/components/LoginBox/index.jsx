import React, {Component} from "react";
import { connect } from 'react-redux'
import LoginBoxLogo from "../LoginBoxLogo";
import LoginBoxAuthForm from "../LoginBoxAuthForm";
import LoginBoxNav from "../LoginBoxNav";
import LoadingBlock from "../LoadingBlock"

import "./styles.less";

import {
    logOutUser,
    clearLogInError,
} from "../../actions/user"


function LoginBox(props) {
    let LoginBoxBody;
    if(props.user && props.user.isGettingUserInfo)
        LoginBoxBody = (
            <LoadingBlock caption="Отримання інформації про користувача..."/>
        );
    else if(props.user && props.user.isAuthenticated)
        LoginBoxBody = (
            <LoginBoxNav
                logOutUser={props.logOutUser}
                clearUserAccessError={props.clearLogInError}
                user={props.user}
            />
        );
    else
        LoginBoxBody = (
            <LoginBoxAuthForm
                clearLogInError={props.clearLogInError}
                user={props.user}
            />
        );

    return (
        <div className="login-page login-box-wrapper">
            <div className="box box-primary login-box">
                <LoginBoxLogo />
                { LoginBoxBody }
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clearLogInError: () => dispatch( clearLogInError() ),
        logOutUser: () => dispatch(logOutUser())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginBox);

