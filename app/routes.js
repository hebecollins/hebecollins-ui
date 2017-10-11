import React from 'react';
import {Route, IndexRoute} from 'react-router';

import ActivatePage from './components/manager/ActivatePage';
import App from './components/App';
import Home from './components/hebecollins/Home'
import Navigation from "./components/common/Navigation";
import PasswordRecover from './components/auth/PasswordRecover'
import PasswordReset from './components/auth/PasswordReset'
import AddTrainers from './components/manager/AddTrainers'
import Notification from './components/common/Notification';
export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        {/*<Route path="home" component={Home}/>*/}
        <Route path="activate-manager" component={ActivatePage}/>
        {/*<Route path="login" component={LoginPage}/>*/}
        <Route path="password-recover" component={PasswordRecover}/>
        <Route path="password-reset" component={PasswordReset}/>
        <Route path="add-trainers" component={Notification}/>
    </Route>
)