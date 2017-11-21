import React from 'react'
import {getRouteByName} from "../../../Toolbox/Helpers/routeHandler"
import {NavLink} from './NavLink'
import NavigationBar from "./NavigationBar";

export const AdminNavigation = ({logout}) => {
    const managerLinks = (
        <ul className="nav navbar-nav">
            <li>
                <NavLink to={getRouteByName("ADMIN_HOME")} onlyActiveOnIndex>Home</NavLink>
            </li>
            <li>
                <NavLink to={getRouteByName("ADD_QUOTES")} onlyActiveOnIndex>Add Quotes</NavLink>
            </li>
            <li>
                <NavLink to={getRouteByName("ADD_GIF")} onlyActiveOnIndex>Add GIF</NavLink>
            </li>
            <li>
                <NavLink to={getRouteByName("GIF_LIST")} onlyActiveOnIndex>GIF List</NavLink>
            </li>
            <li>
                <NavLink to={getRouteByName("CATEGORY_LIST")} onlyActiveOnIndex>Muscle Groups</NavLink>
            </li>
            <li>
                <a href="#" onClick={logout}>Logout</a>
            </li>

            <li className="dropdown">
                <a href="/" className="dropdown-toggle" data-toggle="dropdown">Account<b className="caret"></b></a>
                <ul className="dropdown-menu">
       
                    <li>
                        <NavLink to={getRouteByName('PASSWORD_CHANGE')}>Password Change</NavLink>
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

AdminNavigation.propTypes = {
    logout: React.PropTypes.func.isRequired,
};