import React from 'react'
import {NavigationBar} from "../commons/templates/NavigationBar"
import {getRouteByName} from "../../../Toolbox/Helpers/routeHandler"
import {NavLink} from '../commons/NavLink'

export const AdminNavigation = ({logout}) => {
    const managerLinks = (
        <ul className="nav navbar-nav navbar-right">
            <li>
                <NavLink to={getRouteByName("ADMIN_HOME")} onlyActiveOnIndex>Home</NavLink>
            </li>
            <li>
                <NavLink to={getRouteByName("ADD_QUOTES")} onlyActiveOnIndex>Add Quotes</NavLink>
            </li>
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

AdminNavigation.propTypes = {
    logout: React.PropTypes.func.isRequired
};