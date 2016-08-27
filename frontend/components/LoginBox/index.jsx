import React, {Component} from "react";
import LoginBoxLogo from "../LoginBoxLogo";
import LoginBoxAuthForm from "../LoginBoxAuthForm";
import LoginBoxNav from "../LoginBoxNav";
import "./styles.less";

export default class LoginBox extends Component {
  render() {
    return <div className="login-page login-box-wrapper">
      <div className="box box-primary login-box">
        <LoginBoxLogo />
        <LoginBoxAuthForm />
        <LoginBoxNav />
      </div>
    </div>
  }
}
