import React, { Component } from 'react';
import {Route, Link, withRouter} from "react-router-dom";
import LazyRoute from "lazy-route";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" 
					render={props => (<LazyRoute {...props} component={import ("./Login/Login.jsx")}/>)}/>
        <Route exact path="/dashboard" 
					render={props => (<LazyRoute {...props} component={import ("./Dashboard/Dashboard.jsx")}/>)}/>
      </div>
    );
  }
}

export default withRouter(App);
