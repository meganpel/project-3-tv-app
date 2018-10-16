import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TV from "./pages/TV";


const App = () => (
  <Router>
    <div>
     <Switch>
        <Route exact path="/" component={TV} />
      </Switch>
    </div>
  </Router>
);

export default App;
