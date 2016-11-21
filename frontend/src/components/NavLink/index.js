import React, { Component } from 'react'
import { Link } from 'react-router'

import './styles.less'

export default class NavLink extends Component {
  render() {
    return <Link {...this.props} activeClassName='active'/>
  }
}
