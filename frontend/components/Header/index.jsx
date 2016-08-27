import React, {Component} from "react";
import HeaderLogo from "../HeaderLogo";
import HeaderMenu from "../HeaderMenu";
import HeaderUserBlock from "../HeaderUserBlock";
import "./styles.less";

export default class Header extends Component {
  render() {
    return <header className="main-header">
      <nav className="navbar navbar-static-top">
        <div className="container-fluid header-inner">
          <HeaderLogo />
          <HeaderMenu />
          <HeaderUserBlock />
        </div>
      </nav>
    </header>
  }
}
