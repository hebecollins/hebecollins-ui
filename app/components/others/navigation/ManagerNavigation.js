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
                <NavLink to={getRouteByName("CLIENT_LIST_FOR_MANAGER")} onlyActiveOnIndex>Clients</NavLink>
            </li>


            <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">GYM<b className="caret"></b></a>
                <ul className="dropdown-menu">
                    <li><a href="#">qfit, sashthamangalam</a></li>
                    <li><a href="#">golds, kattangal</a></li>
                    <li><a href="#">power, ambala</a></li>
                </ul>
            </li>
            <li><a href="#">Upcoming Birthdays</a></li>
            <li className="dropdown">
                <a href="/" className="dropdown-toggle" data-toggle="dropdown">Account<b className="caret"></b></a>
                <ul className="dropdown-menu">
                    <li>
                        <a href="#">qfit, sashthamangalam</a>
                    </li>

                    <li>
                        <NavLink to={getRouteByName('PASSWORD_CHANGE')}>Password Change</NavLink>
                    </li>

                    <li>
                        <a href="#" onClick={logout}>Logout</a>
                    </li>
                </ul>
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