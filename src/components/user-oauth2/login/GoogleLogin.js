import React, { Component } from "react";
import "./Login.css";
import { GOOGLE_AUTH_URL } from "../../../constants";
import { redirect } from "react-router-dom";
import googleLogo from "../../../assets/images/google-logo.png";
import Alert from "../../sections/Alert";

class GoogleLogin extends Component {
  componentDidMount() {
    // // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
    // // Here we display the error and then remove the error query parameter from the location.
    // if (this.props.location.state && this.props.location.state.error) {
    //   setTimeout(() => {
    //     Alert.error(this.props.location.state.error, {
    //       timeout: 5000
    //     });
    //     this.props.history.replace({
    //       pathname: this.props.location.pathname,
    //       state: {}
    //     });
    //   }, 100);
    // }
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
