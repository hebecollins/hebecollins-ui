import React from 'react';
import {Link} from 'react-router';

class Navigation extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">Hebecollins</Link>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <Link to="/suggestion" className="navbar-brand">Suggestion Box</Link>
                            <Link to="/contact" className="navbar-brand">Contact Us</Link>
                        </ul>
                        {this.props.children}
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigation;