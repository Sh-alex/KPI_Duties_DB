import React, {Component} from "react";
import { connect } from 'react-redux'
import "./styles.less";

import {
    logOutUser
} from "../../actions/user"

function HeaderUserBlock(props) {
    let UserAvatarImg = props.userState.userAvatar ? (
        <img
            src={props.userState.userAvatar}
            alt={`Фото користувача ${props.userState.userName || ""}`}
            className="img-circle header-user-img" />
    ) : (
        <span className="fa-stack fa-2x header-user-img--without-photo">
            <i className="fa fa-circle fa-stack-2x fa-inverse" />
            <i className="fa fa-user fa-stack-1x"/>
        </span>
    ),
        userName = props.userState.userName || "Шановний користувач";

    return (
        <div className="header-user">
            <div className="header-user-inner">
                <a className="header-user-link dropdown-toggle" href="javascript:void(0)">
                    {UserAvatarImg}
                    <span className="header-user-caption">
                        Вітаємо,<br />
                        <span className="user-name" title={userName}>
                            {userName}
                        </span>
                    </span>
                </a>
                <div className="dropdown-menu header-user-menu">
                    <li className="">
                        <a
                            href="javascript:void(0)"
                            className="btn-block btn-flat header-user-menu-item btn-logout"
                            onClick={props.logOutUser}
                        >
                            Вихід з аккаунта
                            <i className="fa fa-sign-out" />
                        </a>
                    </li>
                </div>
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
)(HeaderUserBlock);

