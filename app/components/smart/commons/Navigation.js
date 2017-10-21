import React from 'react';
import {ClientNavigation} from '../../dumb/Navigation/ClientNavigation';
import {GuestNavigation} from '../../dumb/Navigation/GuestNavigation';
import {TrainerNavigation} from '../../dumb/Navigation/TrainerNavigation';
import {ManagerNavigation} from '../../dumb/Navigation/ManagerNavigation';
import {connect} from 'react-redux';
import {logoutRequest} from '../../../actions/commons/authActions'

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
        const {isAuthenticated, user, logoutRequest} = this.props;
        return (
            <div>
                {
                    !isAuthenticated ? <GuestNavigation/>
                        : (user.user_type === 'client') ? <ClientNavigation logout={this.logout}/>
                        : (user.user_type === 'trainer') ? <TrainerNavigation logout={this.logout}/>
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