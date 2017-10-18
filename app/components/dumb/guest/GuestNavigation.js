import React from 'react';
import NavigationBar from '../commons/frames/NavigationBar';
import {Link} from 'react-router'
import {getRouteByName} from "../../../Toolbox/Helpers/routeHandler";

class GuestNavigation extends React.Component {

    render() {
        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <Link to={getRouteByName("GUEST_HOME")} activeClassName="active" onlyActiveOnIndex>Home</Link>
                </li>

                {/*<li>*/}
                    {/*<Link to={getRouteByName("VERIFY")} activeClassName="active" onlyActiveOnIndex>About Us</Link>*/}
                {/*</li>*/}

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