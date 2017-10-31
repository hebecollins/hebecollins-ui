import React from 'react';
import {NavigationBar} from './NavigationBar';
import {getRouteByName} from "../../../Toolbox/Helpers/routeHandler";
import {NavLink} from "./NavLink"

export const GuestNavigation = () => {
    const guestLinks = (
        <ul className="nav navbar-nav navbar-right">
            <li>
                <NavLink to={getRouteByName("GUEST_HOME")} onlyActiveOnIndex>Home</NavLink>
            </li>

            <li>
                <NavLink to={getRouteByName("VERIFY")} onlyActiveOnIndex>About Us</NavLink>
            </li>

            {/*<li>*/}
            {/*<Link to="#" activeClassName="active" onlyActiveOnIndex>Contact Us</Link>*/}
            {/*</li>*/}
        </ul>
    );

    return (
        <NavigationBar>
            {guestLinks}
        </NavigationBar>
    );
};
