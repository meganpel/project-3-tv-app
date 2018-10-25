import React, { Component } from "react";
import './Login.css';

class Login extends Component {
  state = {
    showSignUp: true,
    signUpEmail: "",
    signUpPassword: "",
    loginEmail: "",
    loginPassword: "",
    errorSignUp: "",
    errorLogin: ""
  };

  pressLogin() {
    fetch("http://localhost:3001/login", {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      credentials: 'include',
      body: JSON.stringify({email: this.state.loginEmail, password: this.state.loginPassword}),
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          this.props.setLoggedIn(result.email);
          this.setState({loginEmail: "", loginPassword: ""});
          this.props.hideLoginModal();
        } else {
          this.setState({errorLogin: result.message});
        }
      });
  }

  pressSignUp() {
    fetch("http://localhost:3001/signup", {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      credentials: 'include',
      body: JSON.stringify({email: this.state.signUpEmail, password: this.state.signUpPassword}),
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          this.props.setLoggedIn(result.email);
          this.setState({signUpEmail: "", signUpPassword: ""});
          this.props.hideLoginModal();
        } else {
          this.setState({errorSignUp: result.message});
        }
      });
  }

  render() {
    return (
      <div className={this.props.showLoginModal ? "wrapper" : "wrapper-hidden"} onClick={() => this.props.hideLoginModal()}>
        <div className="form" onClick={(e) => {e.stopPropagation();}}>

          <ul className="tab-group">
            <li className={this.state.showSignUp ? "tab active": "tab"}><a onClick={() => this.setState({showSignUp: true})}>Sign Up</a></li>
            <li className={!this.state.showSignUp ? "tab active": "tab"}><a onClick={() => this.setState({showSignUp: false})}>Log In</a></li>
          </ul>

          <div className="tab-content">
            <div className={!this.state.showSignUp ? "hide-side": ""}>
              <h1 className="login-title">Sign Up for Free</h1>
              <div className="field-wrap">
                <input type="email" placeholder="Email" value={this.state.signUpEmail} onChange={(e) => this.setState({signUpEmail: e.target.value})} />
              </div>
              <div className="field-wrap">
                <input type="password" placeholder="Password" value={this.state.signUpPassword} onChange={(e) => this.setState({signUpPassword: e.target.value})} />
              </div>

              <div className={this.state.errorSignUp ? "error-message" : "error-message-hidden"} >{this.state.errorSignUp}</div>

              <button className="button button-block" onClick={() => this.pressSignUp()}>Get Started</button>

            </div>

            <div className={this.state.showSignUp ? "hide-side": ""}>
              <h1 className="login-title">Welcome Back!</h1>
              <div className="field-wrap">
                <input type="email" placeholder="Email" value={this.state.loginEmail} onChange={(e) => this.setState({loginEmail: e.target.value})} />
              </div>
              <div className="field-wrap">
                <input type="password" placeholder="Password" value={this.state.loginPassword} onChange={(e) => this.setState({loginPassword: e.target.value})} />
              </div>

              <div className={this.state.errorLogin ? "error-message" : "error-message-hidden"} >{this.state.errorLogin}</div>

              <button className="button button-block" onClick={() => this.pressLogin()}>Get Started</button>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Login;
