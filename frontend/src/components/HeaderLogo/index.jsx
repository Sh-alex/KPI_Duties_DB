import React, {Component} from "react";
import {Link} from "react-router";
import "./styles.less";

export default function HeaderLogo() {
    return (
        <div className="header-logo">
            <Link to='/' className="header-logo-link" title='Автоматизована інформаційна система "Класифікатор посад"'>
                <p className="header-logo-text header-logo-text--abbr">
                    АІС "КП"
                </p>
            </Link>
        </div>
    );
}
