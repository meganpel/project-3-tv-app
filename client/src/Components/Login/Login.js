import React, { Component } from "react";
import './Login.css';

class Login extends Component {
  state = {
    showSignUp: true
  };

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
              <h1>Sign Up for Free</h1>
              <div className="field-wrap">
                <input type="email" placeholder="Email" />
              </div>
              <div className="field-wrap">
                <input type="password" placeholder="Password" />
              </div>

              <button className="button button-block">Get Started</button>

            </div>

            <div className={this.state.showSignUp ? "hide-side": ""}>
              <h1>Welcome Back!</h1>
              <div className="field-wrap">
                <input type="email" placeholder="Email" />
              </div>
              <div className="field-wrap">
                <input type="password" placeholder="Password" />
              </div>

              <button className="button button-block">Log In</button>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Login;
