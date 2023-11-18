import React, { Component } from "react";
import "./Login.css";
import { GOOGLE_AUTH_URL } from "../../../constants";
import { redirect } from "react-router-dom";
import googleLogo from "../../../assets/images/google-logo.png";
import Alert from "../../sections/Alert";

class GoogleLogin extends Component {
  componentDidMount() {
  }

  render() {
    if (this.props.authenticated) {
      return redirect("/")
    }

    return (
      <div className="login-container">
        <div className="login-content">
          <SampleLogin />
        </div>
      </div>
    );
  }
}

class SampleLogin extends Component {
  render() {
    return (
      <div className="social-login">
        <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
          <img src={googleLogo} alt="Google" /> Log in with Google
        </a>
      </div>
    );
  }
}

export default GoogleLogin;
