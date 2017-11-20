import React from 'react';
import NavigationBar from "./NavigationBar";
import {getRouteByName} from "../../../Toolbox/Helpers/routeHandler"
import {NavLink} from './NavLink'

export const ClientNavigation =({logout})=>{
     const clientLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <NavLink to={getRouteByName("CLIENT_HOME")} onlyActiveOnIndex>Home</NavLink>
                </li>
                <li>
                    <NavLink to={getRouteByName("GET_WORKOUT_FOR_TODAY")} onlyActiveOnIndex>Get Workout</NavLink>
                </li>
                <li>
                    <NavLink to={getRouteByName("TRAINER_LIST_FOR_CLIENT")} onlyActiveOnIndex>Trainers</NavLink>
                </li>
                <li><a href="#" onClick={logout}>Logout</a></li>
            </ul>
        );

        return (
            <NavigationBar>
                {clientLinks}
            </NavigationBar>
        );
    };

ClientNavigation.propTypes = {
    logout: React.PropTypes.func.isRequired
};