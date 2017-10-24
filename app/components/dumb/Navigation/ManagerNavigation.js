import React from 'react'
import {NavigationBar} from "../commons/templates/NavigationBar"
import {getRouteByName} from "../../../Toolbox/Helpers/routeHandler"
import {NavLink} from '../commons/NavLink'

export const ManagerNavigation = ({logout}) => {
    const managerLinks = (
        <ul className="nav navbar-nav navbar-right">
            <li>
                <NavLink to={getRouteByName("MANAGER_HOME")} onlyActiveOnIndex>Home</NavLink>
            </li>
            <li>
                <NavLink to={getRouteByName("ADD_TRAINER")} onlyActiveOnIndex>Add Trainer</NavLink>
            </li>


            <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">GYM<b className="caret"></b></a>
                <ul className="dropdown-menu">
                    <li><a href="#">qfit, sashthamangalam</a></li>
                    <li><a href="#">golds, kattangal</a></li>
                    <li><a href="#">power, ambala</a></li>
                </ul>
            </li>
            {/*<li className={classnames({'active': this.state.profile})}>*/}
            {/*<a onClick={this.onClick}*/}
            {/*name="profile">Profile</a></li>*/}
            {/*<li className={classnames({'active': this.state.trainers})}>*/}
            {/*<a onClick={this.onClick}*/}
            {/*name="trainers">Trainers</a></li>*/}
            <li><a href="#">Upcoming Birthdays</a></li>
            {/*<li><a href="#">Suggestion Box</a></li>*/}
            {/*<li><a href="#">About Us</a></li>*/}
            {/*<li><a href="#">Contact Us</a></li>*/}
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