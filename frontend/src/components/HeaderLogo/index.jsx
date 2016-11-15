import React, {Component} from "react";
import {Link} from "react-router";
import "./styles.less";

export default function HeaderLogo() {
    return (
        <Link to='/' className="header-logo" title='Автоматизована інформаційна система "Класифікатор посад"'>
            <p className="header-logo-text header-logo-text--abbr">
                АІС "КП"
            </p>
        </Link>
    );
}
