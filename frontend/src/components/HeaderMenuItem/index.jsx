import React, {Component, PropTypes} from "react";
import {Link} from "react-router";
import classNames from "classnames"

export default class HeaderMenuItem extends Component {
    render () {
        let className = classNames({
            "header-menu-item": true,
            "active": this.context.router.isActive(this.props.to, true)
        });

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
