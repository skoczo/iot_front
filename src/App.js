import React from 'react';
import { useCookies } from 'react-cookie';
import Dashboard from './dashboard/dashboard.js'
import './App.css';
import LoginPage from './auth/login.js'

var tokenName = 'auth-token';

function App() { 
    const [cookies, setCookie, removeCookie] = useCookies([tokenName]);
    // setCookie(tokenName, 'val')
    console.log(cookies[tokenName])
    if(cookies[tokenName]) {
      return <Dashboard/>;
    } else {
      return <LoginPage/>;
    }
  }

export default App;
