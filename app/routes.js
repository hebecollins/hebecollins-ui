import React from 'react';
import {Route, IndexRoute} from 'react-router';

import ActivatePage from './components/manager/ActivatePage';
import App from './components/App';
import Home from './components/hebecollins/Home'
import Navigation from "./components/common/Navigation";
import PasswordRecover from './components/auth/PasswordRecover'
import PasswordReset from './components/auth/PasswordReset'
import AddTrainers from './components/common/AddUsersInBulk'
import Monitor from './components/common/Monitor';
import authCheck from './components/auth/AuthCheck';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="client" component={ClientHome}/>
        <Route path="trainer" component={TrainerHome}/>
        <Route path="manager" component={ManagerHome}/>
        {/*<Route path="home" component={Home}/>*/}
        <Route path="activate-manager" component={ActivatePage}/>
        {/*<Route path="login" component={LoginPage}/>*/}
        <Route path="password/recover" component={authCheck(PasswordRecover)}/>
        <Route path="password-reset" component={PasswordReset}/>
        <Route path="add-trainers" component={Monitor}/>
    </Route>
)