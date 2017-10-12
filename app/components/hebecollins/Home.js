import React from 'react';
import Navigation from "../common/Navigation";
import FlashMessageList from './../flash/FlashMessageList'
import {connect} from 'react-redux';
import Description from "./../hebecollins/Description";
import LoginAndSignup from "./../hebecollins/LoginAndSignup";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {isAuthenticated} = this.props.auth;
        const {user_type} = this.props.auth.user;
        const guestHomePage = (
            <div className="row">
                <div className="col col-lg-6 col-md-6 hidden-sm hidden-xs">
                    <div className="left"><div className="hebecollins-content-child">
                        <Description/>
                    </div>
                    </div>
                </div>
                <div className="col col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="right">
                        <div className="hebecollins-content-child">
                        <LoginAndSignup/>
                    </div>
                    </div>
                </div>
            </div>
        );

        return (
            <div>
                {/*<Navigation/>*/}
                {isAuthenticated ?
                    <div>
                        <h1>Work under progress! I am a {user_type}</h1>
                        <h2>'GYM' coloumn is for anyone having multiple gym access.
                            It can be a trainer, manager or a client</h2>
                    </div>

                    : guestHomePage
                }
            </div>
        )
    }
}

Home.propTypes = {
    auth: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Home);