import React, { Component } from 'react';
import Dashboard from './dashboard/dashboard.js'
import './App.css';
import LoginPage from './auth/login.js'
import Cookies from 'js-cookie'


var tokenName = 'auth-token';

class App extends Component {
  state = {
    loggedIn: false
  };

  checkCookie() {
    console.log('get tokenName')
    console.log(Cookies.get(tokenName))

    if(Cookies.get(tokenName)  === undefined ) {
      return false;
    }
    return true;
  }

  login = (token) => {
    console.log("login")
    console.log(token)
    Cookies.set(tokenName, token);
    this.setState({ loggedIn: true})
  }

  render() {
    console.log(this.state.loggedIn )
    console.log(this.checkCookie() )

    if (this.state.loggedIn || this.checkCookie()) {
        return <Dashboard />;
    } else {
      return <LoginPage loginHook={this.login}/>;
    }
  }
}

export default App;
