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
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
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