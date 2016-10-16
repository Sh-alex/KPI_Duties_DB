import React, {Component} from "react";
import HeaderMenuItem from "../HeaderMenuItem";
import "./styles.less";

export default class HeaderMenu extends Component {
  render() {
    return <div className="header-menu">
        <ul className="nav navbar-nav header-menu-navbar">
            <HeaderMenuItem to='/add'>
                <i className="fa fa-plus" /> Додати
            </HeaderMenuItem>
            <HeaderMenuItem to='/search'>
                <i className="fa fa-search" /> Пошук
            </HeaderMenuItem>
        </ul>
    </div>
  }
}
