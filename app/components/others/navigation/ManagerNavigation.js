import React from 'react'
import NavigationBar from "./NavigationBar"
import {getRouteByName} from "../../../Toolbox/Helpers/routeHandler"
import {NavLink} from './NavLink'

export const ManagerNavigation = ({logout}) => {
    const managerLinks = (
        <ul className="nav navbar-nav navbar-right">
            <li>
                <NavLink to={getRouteByName("MANAGER_HOME")} onlyActiveOnIndex>Home</NavLink>
            </li>
            <li>
                <NavLink to={getRouteByName("ADD_TRAINER")} onlyActiveOnIndex>Add Trainer</NavLink>
            </li>
            <li>
                <NavLink to={getRouteByName("ADD_GYM")} onlyActiveOnIndex>Add Gym</NavLink>
            </li>
            <li>
                <NavLink to={getRouteByName("GYM_PROFILE_IN_EDIT_MODE")} onlyActiveOnIndex>Gym Profile</NavLink>
            </li>
            <li>
                <NavLink to={getRouteByName("CLIENT_LIST_FOR_MANAGER")} onlyActiveOnIndex>Clients</NavLink>
            </li>
            <li>
                <NavLink to={getRouteByName("TRAINER_LIST_FOR_MANAGER")} onlyActiveOnIndex>Trainers</NavLink>
            </li>
            <li>
                <a href="#" onClick={logout}>Logout</a>
            </li>
        </ul>
    );

    return (
        <NavigationBar>
            {managerLinks}
        </NavigationBar>
    );
};

ManagerNavigation.propTypes = {
    logout: React.PropTypes.func.isRequired
};