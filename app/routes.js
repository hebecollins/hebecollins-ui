import React from 'react';
import {Route, IndexRoute} from 'react-router';

import SignUpPage from './components/signup/SignUpPage';
import App from './components/App';
import Greetings from "./components/Greetings";
import LoginPage from "./components/login/LoginPage";
import Home from './components/hebecollins/Home'

export default (
    <Route path="/" component={App}>
        {/*<IndexRoute component={Greetings}/>*/}
        <Route path="home" component={Home}/>
        {/*<Route path="login" component={LoginPage}/>*/}
    </Route>
)