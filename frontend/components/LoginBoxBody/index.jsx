import React, {Component} from "react";
import "./styles.less";

export default class LoginBoxBody extends Component {
  render() {
    return <div className="login-box-body" >
        {this.props.children}
    </div>
    }
}
