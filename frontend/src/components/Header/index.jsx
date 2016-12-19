import React, {Component} from "react";
import { connect } from 'react-redux'
import HeaderLogo from "../HeaderLogo";
import HeaderMenu from "../HeaderMenu";
import HeaderUserBlock from "../HeaderUserBlock";
import "./styles.less";

import {
    logOutUser
} from "../../actions/user"

function Header(props) {
    let userHasAccessToCtrlDcPage = props.user.isAuthenticated &&
            props.user.permissions &&
            props.user.permissions.forms &&
            props.user.permissions.forms.ctrlDc &&
            props.user.permissions.forms.ctrlDc.show,
        userHasAccessToSearchPage = props.user.isAuthenticated &&
            props.user.permissions &&
            props.user.permissions.forms &&
            props.user.permissions.forms.searchOccupations &&
            props.user.permissions.forms.searchOccupations.show,
        userHasAccessToAddPage = props.user.isAuthenticated &&
            props.user.permissions &&
            props.user.permissions.forms &&
            props.user.permissions.forms.addNewOccupations &&
            props.user.permissions.forms.addNewOccupations.show;

    return (
        <header className="main-header">
            <nav className="navbar navbar-static-top">
                <div className="container-fluid header-inner">
                    <HeaderLogo />
                    <HeaderMenu
                        showLinkToToCtrlDcPage={userHasAccessToCtrlDcPage}
                        showLinkToToSearchPage={userHasAccessToSearchPage}
                        showLinkToToAddPage={userHasAccessToAddPage}
                    />
                    <HeaderUserBlock
                        userState={props.user}
                        logOutUser={props.logOutUser}
                    />
                </div>
            </nav>
        </header>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
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
)(Header);


