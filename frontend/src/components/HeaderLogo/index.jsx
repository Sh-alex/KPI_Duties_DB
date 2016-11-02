import React, {Component} from "react";
import {Link} from "react-router";
import "./styles.less";

export default class HeaderLogo extends Component {
  render() {
    return <Link to='/' className="header-logo">
        <p className="header-logo-text header-logo-text--abbr">
            АІС "КС"
        </p>
    </Link>
  }
}
