import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {getRouteByName} from "./Toolbox/Helpers/routeHandler"
import NotFound from "./components/hebecollins/commons/NotFound"

import Activate from './components/hebecollins/manager/Activate';
import PasswordRecover from './components/hebecollins/guest/PasswordRecover'
import PasswordReset from './components/hebecollins/commons/PasswordReset'
import authCheck from './AuthCheck';

import App from './components/App';
import GuestHome from './components/hebecollins/guest/Home'
import ClientHome from './components/hebecollins/client/ClientHome';
import TrainerHome from './components/hebecollins/trainer/TrainerHome'
import ManagerHome from './components/hebecollins/manager/ManagerHome'
import Verify from "./components/hebecollins/guest/Verify";
import PasswordChange from "./components/hebecollins/commons/PasswordChange";
import AdminHome from "./components/hebecollins/admin/AdminHome";
import AddQuotes from "./components/hebecollins/admin/AddQuotes";
import AddTrainer from "./components/hebecollins/manager/AddTrainer";
import ActivateTrainer from "./components/hebecollins/trainer/ActivateTrainer";
import AddClient from "./components/hebecollins/trainer/AddClient";
import ActivateClient from "./components/hebecollins/client/ActivateClient";
import AssignWorkout from "./components/hebecollins/trainer/AssignWorkout";
import ClientListForTrainer from "./components/hebecollins/trainer/ClientListForTrainer";
import ClientListForManager from "./components/hebecollins/manager/ClientListForManager";
import NoRecordsFound from "./components/hebecollins/commons/NoRecordsFound";
import ClientProfile from "./components/hebecollins/client/ClientProfile";
import ViewWorkout from "./components/hebecollins/commons/ViewWorkout";
import CreateWorkoutSchedule from "./components/hebecollins/trainer/CreateWorkoutSchedule";

export default (
    <div className="something">
        <Route path="/" component={App}>
            {/*home*/}
            <IndexRoute component={authCheck(GuestHome)}/>
            <Route path={getRouteByName('MANAGER_HOME')} component={authCheck(ManagerHome)}/>
            <Route path={getRouteByName('TRAINER_HOME')} component={authCheck(TrainerHome)}/>
            <Route path={getRouteByName('CLIENT_HOME')} component={authCheck(ClientHome)}/>
            <Route path={getRouteByName('ADMIN_HOME')} component={authCheck(AdminHome)}/>

            {/*activate*/}
            <Route path={getRouteByName('ACTIVATE_MANAGER')} component={authCheck(Activate)}/>
            <Route path={getRouteByName('ACTIVATE_TRAINER')} component={authCheck(ActivateTrainer)}/>
            <Route path={getRouteByName('ACTIVATE_CLIENT')} component={authCheck(ActivateClient)}/>
            <Route path={getRouteByName('VERIFY')} component={authCheck(Verify)}/>

            {/*password*/}
            <Route path={getRouteByName('PASSWORD_RECOVER')} component={authCheck(PasswordRecover)}/>
            <Route path={getRouteByName('PASSWORD_RESET')} component={authCheck(PasswordReset)}/>
            <Route path={getRouteByName('PASSWORD_CHANGE')} component={authCheck(PasswordChange)}/>

            {/*add*/}
            <Route path={getRouteByName('ADD_TRAINER')} component={authCheck(AddTrainer)}/>
            <Route path={getRouteByName('ADD_CLIENT')} component={authCheck(AddClient)}/>
            <Route path={getRouteByName('ADD_QUOTES')} component={authCheck(AddQuotes)}/>
            <Route path={getRouteByName('ASSIGN_WORKOUT')} component={authCheck(AssignWorkout)}/>
            <Route path={getRouteByName('CREATE_WORKOUT')} component={authCheck(CreateWorkoutSchedule)}/>

            {/*user list*/}
            <Route path={getRouteByName('CLIENT_LIST_FOR_TRAINER')} component={authCheck(ClientListForTrainer)}/>
            <Route path={getRouteByName('CLIENT_LIST_FOR_MANAGER')} component={authCheck(ClientListForManager)}/>

            {/*view*/}
            <Route path={getRouteByName('CLIENT_PROFILE')} component={authCheck(ClientProfile)}/>
            <Route path={getRouteByName('VIEW_WORKOUT')} component={authCheck(ViewWorkout)}/>

            {/*no record found*/}
            <Route path={getRouteByName('NO_RECORDS_FOUND')} component={authCheck(NoRecordsFound)}/>
            {/*not found*/}
            <Route path='/*' component={NotFound}/>
        </Route>
    </div>
)