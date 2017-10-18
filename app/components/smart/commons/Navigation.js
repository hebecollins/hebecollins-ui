import React from 'react';
import ClientNavigation from '../../dumb/client/ClientNavigation';
import GuestNavigation from '../../dumb/guest/GuestNavigation';
import TrainerNavigation from '../../dumb/trainer/TrainerNavigation';
import ManagerNavigation from '../../dumb/manager/ManagerNavigation';
import {connect} from 'react-redux';


class Navigation extends React.Component {
    render() {
        const {isAuthenticated, user} = this.props;
        return (
            <div>{
                !isAuthenticated ? <GuestNavigation/>
                    : (user.user_type === 'client') ? <ClientNavigation/>
                    : (user.user_type === 'trainer') ? <TrainerNavigation/>
                        : <ManagerNavigation/>
            }</div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, null)(Navigation);