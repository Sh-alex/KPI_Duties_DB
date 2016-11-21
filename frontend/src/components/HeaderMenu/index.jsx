import React, {Component} from "react";
import HeaderMenuItem from "../HeaderMenuItem";
import "./styles.less";

export default function HeaderMenu (props) {
    return (
        <div className="header-menu">
            <ul className="nav navbar-nav header-menu-navbar">
                <HeaderMenuItem to='/add'>
                    <i className="fa fa-plus" /> Додати
                </HeaderMenuItem>
                <HeaderMenuItem to='/search'>
                    <i className="fa fa-search" /> Пошук
                </HeaderMenuItem>
                <HeaderMenuItem to='/ctrldict'>
                    <i className="fa fa-book" /> Списки
                </HeaderMenuItem>
            </ul>
        </div>
    );
}
