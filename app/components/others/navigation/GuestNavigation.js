import React from 'react';
import {NavigationBar} from './NavigationBar';
import {getRouteByName} from "../../../Toolbox/Helpers/routeHandler";
import {NavLink} from "./NavLink"

export const GuestNavigation = () => {
    const guestLinks = (
        <ul className="nav navbar-nav">
            <li>
                <NavLink to={getRouteByName("HOME")} onlyActiveOnIndex>Home</NavLink>
            </li>

            <li>
                <NavLink to={getRouteByName("VERIFY")} onlyActiveOnIndex>About Us</NavLink>
            </li>
        </ul>
    );

    return (
        <NavigationBar>
            {guestLinks}
        </NavigationBar>
    );
};
