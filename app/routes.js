import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {getRouteByName} from "./Toolbox/Helpers/routeHandler"
import NotFound from "./components/hebecollins/commons/NotFound"

import Activate from './components/hebecollins/manager/Activate';
import PasswordRecover from './components/hebecollins/guest/PasswordRecover'
import PasswordReset from './components/hebecollins/commons/PasswordReset'
import Monitor from './components/smart/commons/Monitor';
import authCheck from './AuthCheck';

import App from './components/App';
import GuestHome from './components/hebecollins/guest/Home'
import ClientHome from './components/hebecollins/client/ClientHome';
import TrainerHome from './components/hebecollins/trainer/TrainerHome'
import ManagerHome from './components/hebecollins/manager/ManagerHome'
import Verify from "./components/hebecollins/guest/Verify";
import PasswordChange from "./components/hebecollins/commons/PasswordChange";

export default (
    <div className="something">
        <Route path="/" component={App}>
            <IndexRoute component={authCheck(GuestHome)}/>
            <Route path={getRouteByName('CLIENT_HOME')} component={authCheck(ClientHome)}/>
            <Route path={getRouteByName('TRAINER_HOME')} component={authCheck(TrainerHome)}/>
            <Route path={getRouteByName('MANAGER_HOME')} component={authCheck(ManagerHome)}/>

            <Route path={getRouteByName('ACTIVATE_MANAGER')} component={authCheck(Activate)}/>
            <Route path={getRouteByName('VERIFY')} component={authCheck(Verify)}/>
            <Route path={getRouteByName('PASSWORD_RECOVER')} component={PasswordRecover}/>
            <Route path={getRouteByName('PASSWORD_RESET')} component={authCheck(PasswordReset)}/>
            <Route path={getRouteByName('PASSWORD_CHANGE')} component={authCheck(PasswordChange)}/>
            <Route path={getRouteByName('ADD_TRAINER')} component={authCheck(Monitor)}/>
            <Route path='/*' component={NotFound}/>
        </Route>
    </div>

)