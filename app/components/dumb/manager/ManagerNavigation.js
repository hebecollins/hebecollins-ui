import React from 'react';
import {connect} from 'react-redux';
import {logoutRequest} from '../../../actions/commons/authActions'
import NavigationBar from "../commons/NavigationBar";
import {getRouteByName} from "../../../Toolbox/Helpers/routeHandler";
import classnames from 'classnames';
import {redirectByName} from "../../../Toolbox/Helpers/redirect";

class ManagerNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PASSWORD_CHANGE: false,
            MANAGER_HOME: false
        };
        this.onClick = this.onClick.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    logout(e) {
        e.preventDefault();
        this.props.logoutRequest();
    }

    resetState(){
        const state = this.state;
        console.log(state);
        Object.keys(state).map((field) =>{
            console.log(field);
            this.setState({[field]:false})
        });
        this.setState({})
    }
    onClick(e) {
        this.resetState();
        this.setState({[e.target.name]: true})
        redirectByName("PASSWORD_CHANGE")


    }

    render() {
        const active = false;
        const managerLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li className="active">
                    <a href={getRouteByName("MANAGER_HOME")}>
                        Home</a></li>
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">GYM<b className="caret"></b></a>
                    <ul className="dropdown-menu">
                        <li><a href="#">qfit, sashthamangalam</a></li>
                        <li><a href="#">golds, kattangal</a></li>
                        <li><a href="#">power, ambala</a></li>
                    </ul>
                </li>
                <li className={classnames({'active': this.state.profile})}>
                    <a onClick={this.onClick}
                       name="profile">Profile</a></li>
                <li className={classnames({'active': this.state.trainers})}>
                    <a onClick={this.onClick}
                    name="trainers">Trainers</a></li>
                <li><a href="#">Upcoming Birthdays</a></li>
                {/*<li><a href="#">Suggestion Box</a></li>*/}
                {/*<li><a href="#">About Us</a></li>*/}
                {/*<li><a href="#">Contact Us</a></li>*/}
                <li className="dropdown">
                    <a href="/" className="dropdown-toggle" data-toggle="dropdown">Account<b className="caret"></b></a>
                    <ul className="dropdown-menu">
                        <li><a href="#">qfit, sashthamangalam</a></li>
                        {/*<li><a href={getRouteByName('PASSWORD_CHANGE')}>Password Change</a></li>*/}
                        <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
                    </ul>
                </li>
            </ul>
        );

        return (
            <NavigationBar>
                {managerLinks}
            </NavigationBar>
        );
    }
}

ManagerNavigation.propTypes = {
    logoutRequest: React.PropTypes.func.isRequired
};

export default connect(null, {logoutRequest})(ManagerNavigation);