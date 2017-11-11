import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {getRouteByName} from "./Toolbox/Helpers/routeHandler"
import NotFound from "./components/hebecollins/commons/NotFound"

import Activate from './components/hebecollins/manager/ActivateManager';
import PasswordRecover from './components/hebecollins/authentication/PasswordRecover'
import PasswordReset from './components/hebecollins/authentication/PasswordReset'
import authCheck from './AuthCheck';

import App from './components/App';
import GuestHome from './components/Home'
import ClientHome from './components/hebecollins/client/ClientHome';
import TrainerHome from './components/hebecollins/trainer/TrainerHome'
import ManagerHome from './components/hebecollins/manager/ManagerHome'
import Verify from "./components/hebecollins/authentication/Verify";
import PasswordChange from "./components/hebecollins/authentication/PasswordChange";
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
import ClientProfile from "./components/hebecollins/commons/ClientProfile";
import ViewWorkout from "./components/hebecollins/commons/ViewWorkout";
import CreateWorkoutSchedule from "./components/hebecollins/trainer/CreateWorkoutSchedule";
import SavedWorkoutList from "./components/hebecollins/trainer/SavedWorkoutList";
import AddGIF from "./components/hebecollins/admin/AddGIF";
import GetCurrentWorkout from "./components/hebecollins/client/GetCurrentWorkout";
import Autosuggestion from "./components/others/extra/Autosuggestion";
import GifList from "./components/hebecollins/admin/GifList";

export default (
    <Route path="/" component={App}>

        {/*home page while logged out*/}
        <IndexRoute component={authCheck(GuestHome)}/>

        {/*authentication*/}
        <Route path={getRouteByName('VERIFY')} component={authCheck(Verify)}/>
        <Route path={getRouteByName('PASSWORD_RECOVER')} component={authCheck(PasswordRecover)}/>
        <Route path={getRouteByName('PASSWORD_RESET')} component={authCheck(PasswordReset)}/>
        <Route path={getRouteByName('PASSWORD_CHANGE')} component={authCheck(PasswordChange)}/>


        {/*manager*/}
        <Route path={getRouteByName('MANAGER_HOME')} component={authCheck(ManagerHome)}/>
        <Route path={getRouteByName('ACTIVATE_MANAGER')} component={authCheck(Activate)}/>
        <Route path={getRouteByName('ADD_TRAINER')} component={authCheck(AddTrainer)}/>
        <Route path={getRouteByName('CLIENT_LIST_FOR_MANAGER')} component={authCheck(ClientListForManager)}/>


        {/*trainer*/}
        <Route path={getRouteByName('TRAINER_HOME')} component={authCheck(TrainerHome)}/>
        <Route path={getRouteByName('ACTIVATE_TRAINER')} component={authCheck(ActivateTrainer)}/>
        <Route path={getRouteByName('ADD_CLIENT')} component={authCheck(AddClient)}/>
        <Route path={getRouteByName('ASSIGN_WORKOUT')} component={authCheck(AssignWorkout)}/>
        <Route path={getRouteByName('CREATE_WORKOUT')} component={authCheck(CreateWorkoutSchedule)}/>
        <Route path={getRouteByName('CLIENT_LIST_FOR_TRAINER')} component={authCheck(ClientListForTrainer)}/>
        <Route path={getRouteByName('SAVED_WORKOUT_LIST')} component={authCheck(SavedWorkoutList)}/>


        {/*client*/}
        <Route path={getRouteByName('CLIENT_HOME')} component={authCheck(ClientHome)}/>
        <Route path={getRouteByName('ACTIVATE_CLIENT')} component={authCheck(ActivateClient)}/>
        <Route path={getRouteByName('GET_WORKOUT_FOR_TODAY')} component={authCheck(GetCurrentWorkout)}/>


        {/*commons*/}
        <Route path={getRouteByName('CLIENT_PROFILE')} component={authCheck(ClientProfile)}/>
        <Route path={getRouteByName('VIEW_WORKOUT')} component={authCheck(ViewWorkout)}/>
        <Route path={getRouteByName('NO_RECORDS_FOUND')} component={authCheck(NoRecordsFound)}/>


        {/*admin*/}
        <Route path={getRouteByName('ADMIN_HOME')} component={authCheck(AdminHome)}/>
        <Route path={getRouteByName('ADD_QUOTES')} component={authCheck(AddQuotes)}/>
        <Route path={getRouteByName('ADD_GIF')} component={authCheck(AddGIF)}/>
        <Route path={getRouteByName('GIF_LIST')} component={authCheck(GifList)}/>


        <Route path='/*' component={NotFound}/>

    </Route>
)