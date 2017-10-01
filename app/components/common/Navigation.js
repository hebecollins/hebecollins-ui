import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {logout} from '../../actions/loginActions'

class Navigation extends React.Component {
// <nav className="navbar navbar-inverse">
// <div className="container-fluid">
// <div className="navbar-header">
// <Link to="/" className="navbar-brand">Hebecollins</Link>
// </div>
// <div className="collapse navbar-collapse">
// <ul className="nav navbar-nav navbar-right">
// <Link to="/suggestion" className="navbar-brand">Suggestion Box</Link>
// <Link to="/contact" className="navbar-brand">Contact Us</Link>
// </ul>
// {this.props.children}
// </div>
// </div>
// </nav>

    logout(e){
        e.preventDefault();
        this.props.logout();
    }
    render() {


        const {isAuthenticated}=this.props.auth;

        const userLinks = (
        <ul className="nav navbar-nav navbar-right">
            <li className="active"><a href="#">Home</a></li>
            <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">GYM<b className="caret"></b></a>
                <ul className="dropdown-menu">
                    <li><a href="#">qfit, sashthamangalam</a></li>
                    <li><a href="#">golds, kattangal</a></li>
                    <li><a href="#">power, ambala</a></li>
                </ul>
            </li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Trainer</a></li>
            <li><a href="#">Week Workout</a></li>
            <li><a href="#">Upcoming Birthdays</a></li>
            <li><a href="#">Suggestion Box</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
        </ul>
        );

        const guestLinks = (
        <ul className="nav navbar-nav navbar-right">
            <li className="active"><a href="#">Home</a></li>
            <li className="active"><a href="#">About Us</a></li>
            <li className="active"><a href="#">Contact Us</a></li>
        </ul>
        );

        return (

            <div className="navbar navbar-inverse navbar-static-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a href="#" className="navbar-brand">Hebe collins</a>
                        <button className="navbar-toggle" data-toggle="collapse" data-target=".navHeaderCollapse">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse navHeaderCollapse">
                        {isAuthenticated? userLinks:guestLinks}
                    </div>
                </div>
            </div>
        );
    }
}

Navigation.propTypes = {
    auth:React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return{
        auth:state.auth
    }
}
export default connect(mapStateToProps,{logout})(Navigation);