import React from 'react';
import {connect} from 'react-redux';
import {logoutRequest} from '../../../actions/commons/authActions'

class TrainerNavigation extends React.Component {

    logout(e) {
        e.preventDefault();
        this.props.logoutRequest();
    }

    render() {
        const trainerLinks = (
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
                <li><a href="#">Clients</a></li>
                <li><a href="#">Saved Workouts</a></li>
                <li><a href="#">Upcoming Birthdays</a></li>
                <li><a href="#">Suggestion Box</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
            </ul>
        );

        return (
            <div className="container">
                <div className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a href="/" className="pull-left">
                                <img className="img-responsive2" src={require('../../../../images/HC_logo.png')}/>
                            </a>
                            <a href="#" className="navbar-brand">
                                {/*Hebecollins*/}
                            </a>
                            <button className="navbar-toggle" data-toggle="collapse" data-target=".navHeaderCollapse">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse navHeaderCollapse">
                            {trainerLinks}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TrainerNavigation.propTypes = {
    logoutRequest: React.PropTypes.func.isRequired
};

export default connect(null, {logoutRequest})(TrainerNavigation);