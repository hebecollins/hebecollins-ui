import React from 'react';
import {connect} from 'react-redux';
import {logoutRequest} from '../../../actions/commons/authActions'
import NavigationBar from "../commons/templates/NavigationBar";

class ClientNavigation extends React.Component {

    logout(e) {
        e.preventDefault();
        this.props.logoutRequest();
    }

    render() {
        const clientLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li className="active"><a href="/">Home</a></li>
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">GYM<b className="caret"></b></a>
                    <ul className="dropdown-menu">
                        <li><a href="#">qfit, sashthamangalam</a></li>
                        <li><a href="#">golds, kattangal</a></li>
                        <li><a href="#">power, ambala</a></li>
                    </ul>
                </li>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Trainers</a></li>
                <li><a href="#">Week Workout</a></li>
                <li><a href="#">Upcoming Birthdays</a></li>
                <li><a href="#">Suggestion Box</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
            </ul>
        );

        return (
            <NavigationBar>
                {clientLinks}
            </NavigationBar>
        );
    }
}

ClientNavigation.propTypes = {
    logoutRequest: React.PropTypes.func.isRequired
};

export default connect(null, {logoutRequest})(ClientNavigation);