import React from 'react';
import {NavigationBar} from "../commons/templates/NavigationBar"
import {getRouteByName} from "../../../Toolbox/Helpers/routeHandler"
import {NavLink} from '../commons/NavLink'

export const TrainerNavigation =({logout})=>{
        const trainerLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <NavLink to={getRouteByName("TRAINER_HOME")} onlyActiveOnIndex>Home</NavLink>
                </li>
                <li>
                    <NavLink to={getRouteByName("ADD_CLIENT")} onlyActiveOnIndex>Add Client</NavLink>
                </li>

                {/*<li><a href="#">Profile</a></li>*/}
                {/*<li><a href="#">Clients</a></li>*/}
                {/*<li><a href="#">Saved Workouts</a></li>*/}
                {/*<li><a href="#">Upcoming Birthdays</a></li>*/}
                {/*<li><a href="#">Suggestion Box</a></li>*/}
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#" onClick={logout}>Logout</a></li>
            </ul>
        );

        return (
            <NavigationBar>
                {trainerLinks}
            </NavigationBar>
        );
    };

TrainerNavigation.propTypes = {
    logout: React.PropTypes.func.isRequired
};
