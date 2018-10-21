import React, { Component } from 'react';
import Main from "./components/Main";
import Today from "./components/Today";
// import Calendar from "./components/Calendar"
import IncludeTime from "./components/Calendar/CalHolder/IncludeTime";
// import './App.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

import Login from "./Components/Login"
import Profile from "./pages/Profile";
import TV from "./pages/TV";

class App extends Component {
  state = {
    loggedIn: false,
    showLoginModal: false,
    userEmail: "",
  };

  renderMenuLogin() {
    if (this.state.loggedIn) {
      return (
        <li className="nav-item">
          <a className="nav-link" href="#">Logout</a>
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
      <div className="App">
        <Main />;
    <Calendar/> 
      </div>
        <Router>
           <Switch>
          
          <div>
            <ul className="nav justify-content-end">
              <li className="nav-item">
                <NavLink to="/" exact className="nav-link" activeClassName="nav-link-active">Search</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/profile" exact className="nav-link" activeClassName="nav-link-active">My Profile</NavLink>
              </li>
              {this.renderMenuLogin()}
            </ul>
            <Login showLoginModal={this.state.showLoginModal} hideLoginModal={this.hideLoginModal.bind(this)} />
             <Route exact path="/" component={TV} />
             <Route exact path="/calendar" component={IncludeTime} />
             <Route exact path="/today" component={Today} />
             <Route exact path="/profile" component={Profile} />
          </div>
          </Switch>
        </Router>
    );
  }
}

export default App;
