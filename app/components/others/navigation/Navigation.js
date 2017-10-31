import React from 'react';
import {ClientNavigation} from './ClientNavigation';
import {GuestNavigation} from './GuestNavigation';
import {TrainerNavigation} from './TrainerNavigation';
import {ManagerNavigation} from './ManagerNavigation';
import {connect} from 'react-redux';
import {logoutRequest} from '../../../actions/authActions'
import {AdminNavigation} from "./AdminNavigation";

class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this)
    }

    logout(e) {
        e.preventDefault();
        this.props.logoutRequest();
    }

    render() {
        const {isAuthenticated, user} = this.props;
        return (
            <div>
                {
                    !isAuthenticated ? <GuestNavigation/>
                        : (user.user_type === 'client') ? <ClientNavigation logout={this.logout}/>
                        : (user.user_type === 'trainer') ? <TrainerNavigation logout={this.logout}/>
                        : (user.user_type === 'admin') ? <AdminNavigation logout={this.logout}/>
                            : <ManagerNavigation logout={this.logout}/>
                }
            </div>
        );
    }
}

Navigation.propTypes = {
    logoutRequest: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, {logoutRequest})(Navigation);