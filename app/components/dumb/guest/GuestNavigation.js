import React from 'react';
import NavigationBar from '../commons/NavigationBar';

class GuestNavigation extends React.Component {

    render() {
        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li className="active"><a href="/">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
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