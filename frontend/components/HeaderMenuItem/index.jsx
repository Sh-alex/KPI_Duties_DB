import React, { Component, PropTypes } from 'react'
import router, { Link } from "react-router";

export default class HeaderMenuItem extends Component {
    render () {
        let isActive = this.context.router.isActive(this.props.to, true),
            className = isActive ? "active" : "";

        return (
            <li className={className}>
                <Link {...this.props}>
                    {this.props.children}
                </Link>
            </li>
        );
    }
}

HeaderMenuItem.contextTypes = {
    router: PropTypes.object.isRequired
};
