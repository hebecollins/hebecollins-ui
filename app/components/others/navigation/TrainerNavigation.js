import React from 'react';
import NavigationBar from "./NavigationBar"
import {getRouteByName} from "../../../Toolbox/Helpers/routeHandler"
import {NavLink} from './NavLink'

export const TrainerNavigation = ({logout}) => {
    const trainerLinks = (
        <ul className="nav navbar-nav navbar-right">
            <li>
                <NavLink to={getRouteByName("TRAINER_HOME")} onlyActiveOnIndex>Home</NavLink>
            </li>
            <li>
                    <NavLink to={getRouteByName("ADD_CLIENT")} onlyActiveOnIndex>Add Client</NavLink>
            </li>
            <li>
                    <NavLink to={getRouteByName("CLIENT_LIST_FOR_TRAINER")} onlyActiveOnIndex>Client List</NavLink>
            </li>
            <li>
                <NavLink to={getRouteByName("CREATE_WORKOUT")} onlyActiveOnIndex>Create Workout</NavLink>
            </li>
            <li>
                <NavLink to={getRouteByName("SAVED_WORKOUT_LIST")} onlyActiveOnIndex>Workout List</NavLink>
            </li>
            <li><a href="#" onClick={logout}>Logout</a></li>
        </ul>
    );

    return (
        <NavigationBar>
            {trainerLinks}
        </NavigationBar>
    );
};

TrainerNavigation.propTypes = {
    logout: React.PropTypes.func.isRequired
};
