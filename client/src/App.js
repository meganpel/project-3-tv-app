import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

import Login from "./components/Login"
import Profile from "./pages/Profile";
import TV from "./pages/TV";

class App extends Component {
  state = {
    loggedIn: false,
    showLoginModal: false,
    userEmail: "",
  };

  componentDidMount() {
    fetch("http://localhost:3001/status", {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      credentials: 'include'
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          this.setState({loggedIn: true, userEmail: result.email});
        }
      });
  }

  setLoggedIn(email) {
    this.setState({loggedIn: true, userEmail: email});
  }

  setLoggedOut() {
    this.setState({loggedIn: false, userEmail: ""});
  }

  pressLogout() {
    fetch("http://localhost:3001/logout", {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      credentials: 'include'
    })
      .then(res => res.json())
      .then(result => {
        this.setState({loggedIn: false, userEmail: ""});
      });
  }

  renderMyProfile() {
    if (this.state.loggedIn) {
      return (
        <li className="nav-item">
          <NavLink to="/profile" exact className="nav-link" activeClassName="nav-link-active">My Profile</NavLink>
        </li>
      );
    }
  }

  renderUserEmail() {
    if (this.state.loggedIn) {
      return (
        <li className="nav-item">
          <span className="nav-email">{this.state.userEmail}</span>
        </li>
      );
    }
  }

  renderMenuLogin() {
    if (this.state.loggedIn) {
      return (
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={() => this.pressLogout()}>Logout</a>
        </li>
      );
    }

    return (
      <li className="nav-item">
        <a className="nav-link" href="#" onClick={() => this.setState({showLoginModal: true})}>Login</a>
      </li>
    );
  }

  hideLoginModal() {
    this.setState({showLoginModal: false})
  }

  render() {
    return (
        <Router>
          <Switch>
          <div>
            <nav className="navbar nav">
              <div className="container">
                <div className="nav">
                <img src="images/logo-icon-2.png" width="78" height="50"/>
                  <ul className="nav justify-content-end">
                    {this.renderUserEmail()}
                  </ul>
                </div>
                <ul className="nav justify-content-end">
                  <li className="nav-item">
                    <NavLink to="/" exact className="nav-link" activeClassName="nav-link-active">Search</NavLink>
                  </li>
                  {this.renderMyProfile()}
                  {this.renderMenuLogin()}
                </ul>
              </div>
            </nav>
             <Route exact path="/" component={TV} />
             <Route exact path="/profile" component={Profile} />
             <Login
              showLoginModal={this.state.showLoginModal}
              hideLoginModal={this.hideLoginModal.bind(this)}
              setLoggedIn={this.setLoggedIn.bind(this)}
              setLoggedOut={this.setLoggedOut.bind(this)}
            />
          </div>
          </Switch>
        </Router>
    );
  }
}

export default App;