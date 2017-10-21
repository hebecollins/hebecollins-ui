import React from 'react';
import {NavigationBar} from '../commons/templates/NavigationBar';
import {getRouteByName} from "../../../Toolbox/Helpers/routeHandler";
import {NavLink} from "../commons/NavLink"

class GuestNavigation extends React.Component {

    render() {
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
    }
}

export default GuestNavigation;