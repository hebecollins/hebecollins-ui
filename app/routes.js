import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Activate from './components/hebecollins/manager/Activate';
import PasswordRecover from './components/hebecollins/guest/PasswordRecover'
import PasswordReset from './components/hebecollins/commons/PasswordReset'
import Monitor from './components/dumb/commons/Monitor';
import authCheck from './components/filters/AuthCheck';

import App from './components/Application/App';
import GuestHome from './components/hebecollins/guest/Home'

import ClientApp from './components/Application/ClientApp';
import ClientHome from './components/hebecollins/client/ClientHome';

import TrainerApp from './components/Application/TrainerApp';
import TrainerHome from './components/hebecollins/trainer/TrainerHome'

import ManagerApp from './components/Application/ManagerApp';
import ManagerHome from './components/hebecollins/manager/ManagerHome'
import ManagerTest from './components/hebecollins/manager/ManagerTest'
import Verify from "./components/hebecollins/guest/Verify";
import PasswordChange from "./components/hebecollins/commons/PasswordChange";

export default (
    <div>
        <Route path="/" component={App}>
            <IndexRoute component={authCheck(GuestHome)}/>
            <Route path="activate/manager" component={Activate}/>
            <Route path="verify" component={Verify}/>
            <Route path="password/recover" component={authCheck(PasswordRecover)}/>
            <Route path="password/reset" component={PasswordReset}/>
        </Route>

        /*Client-only routes*/
        <Route path="/client" component={authCheck(ClientApp)}>
            <IndexRoute component={ClientHome}/>
            <Route path="password/change" component={authCheck(PasswordChange)}/>
        </Route>

        /*Trainer-only routes*/
        <Route path="/trainer" component={authCheck(TrainerApp)}>
            <IndexRoute component={TrainerHome}/>
            <Route path="password/change" component={authCheck(PasswordChange)}/>
        </Route>

        /*Manager-only routes*/
        <Route path="/manager" component={authCheck(ManagerApp)}>
            <IndexRoute component={ManagerHome}/>
            <Route path="password/change" component={authCheck(PasswordChange)}/>
            <Route path="add/trainer" component={Monitor}/>
            <Route path="test/test" component={ManagerTest}/>
        </Route>
    </div>
)