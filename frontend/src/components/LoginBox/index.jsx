import React, {Component} from "react";
import { connect } from 'react-redux'
import LoginBoxLogo from "../LoginBoxLogo";
import LoginBoxAuthForm from "../LoginBoxAuthForm";
import LoginBoxNav from "../LoginBoxNav";

import "./styles.less";

import {
    logOutUser
} from "../../actions/user"


function LoginBox(props) {
    let loginBoxBody = props.userState.isAuthenticated ? (
        <LoginBoxNav
            logOutUser={props.logOutUser}
        />
    ) : (
        <LoginBoxAuthForm />
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
        logOutUser: () => dispatch(logOutUser())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginBox);

