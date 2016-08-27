import React, { Component } from 'react'
import { Link } from "react-router";

import './styles.less'

export default class HeaderLogo extends Component {
  render() {
    return <Link to='/' className="header-logo navbar-brand">
        <p className="header-logo-text header-logo-text--full hidden">
            Державний<br />класифікатор<br />посад<br />України
        </p>
        <p className="header-logo-text header-logo-text--abbr">
            ДКПУ
        </p>
    </Link>
  }
}
