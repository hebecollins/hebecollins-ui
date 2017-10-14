import React from 'react';
import {Route, IndexRoute} from 'react-router';

import ActivatePage from './components/dumb/manager/ActivatePage';
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

export default (
    <div>
        <Route path="/" component={App}>
            <IndexRoute component={GuestHome}/>
            <Route path="activate-manager" component={ActivatePage}/>
            <Route path="password/recover" component={authCheck(PasswordRecover)}/>
            <Route path="password/reset" component={PasswordReset}/>
            <Route path="add-trainers" component={Monitor}/>
        </Route>
        <Route path="/client" component={ClientApp}>
            <IndexRoute component={ClientHome}/>
        </Route>
        <Route path="/trainer" component={TrainerApp}>
            <IndexRoute component={TrainerHome}/>
        </Route>
        <Route path="/manager" component={ManagerApp}>
            <IndexRoute component={ManagerHome}/>
        </Route>
    </div>
)