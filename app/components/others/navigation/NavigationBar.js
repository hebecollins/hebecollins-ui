import React from 'react';
import $ from 'jquery'
import {connect} from 'react-redux'
import {redirectByName} from "../../../Toolbox/Helpers/redirect";
import {getNotifications, getUnreadNotificationCount} from "../../../actions/notificationActions";
import classnames from 'classnames';
import Notification from "./Notification";

/** Designs the navigation bar look
 * */
class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: '',
            count: '',
            isClicked: ''
        }
        this.notificationClicked = this.notificationClicked.bind(this)
    }


    componentWillMount() {
        if(this.props.isAuthenticated){
            getUnreadNotificationCount().then(res => {
                this.setState({count: res.data.count});
            });
        }
    }


    componentDidMount() {
        $('.nav a').on('click', function () {
            $('.navbar-toggle').click() //bootstrap 3.x by Richard
        });

        $("[data-toggle='navHeaderCollapse']").click(function () {
            let selector = $(this).data("target");
            $(selector).toggleClass('in');
        });
    }


    notificationClicked() {
        this.setState({isClicked: !this.state.isClicked, count:0})
    }


    render() {
        const {count, isClicked} = this.state;
        const nickName = this.props.user.nick_name;
        const gymName = this.props.selectedGym.gym_name;
        const locality = this.props.selectedGym.locality;
        const isAuthenticated = this.props.isAuthenticated;

        const userDetails =
            <div className="nav-user-detail">
                <i className="nav-user-icon fa fa-user-o"/>
                <div className="nav-username">
                    {nickName}
                </div>
                <div className="nav-gymname">
                    {gymName},{locality}
                </div>
            </div>;


        return (
            <div className="navbar navbar-inverse">
                <div className="nav-hebecollins flex">
                    <button
                        className="navbar-toggle"
                        data-toggle="navHeaderCollapse"
                        data-target=".navHeaderCollapse">
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                    </button>
                    <div className="nav-hebecollins-menu collapse2 navHeaderCollapse">
                        <div className="sm">
                            {userDetails}
                        </div>
                        <div>{this.props.children}</div>
                    </div>
                    <a onClick={() => redirectByName("HOME")} className="hebecollins-home">
                        HEBECOLLINS
                    </a>
                </div>

                {isAuthenticated ?
                    <div>
                        <div className={(isClicked || count) ? "notification true" : "notification false"}>
                            <div className="lg">
                                {userDetails}
                            </div>
                            <button className="flex notification-button" onClick={this.notificationClicked}>
                                <div className="notification-icon">
                                    <span className="fa fa-bell"/>
                                </div>
                                <div className={ count ? "notification-count":"notification-count false"}>
                                    <span className="label label-notification">{count}</span>
                                </div>
                            </button>
                        </div>

                        {  isClicked  ?
                            <Notification/>
                            : <div/>
                        }

                    </div>
                    : <div/>
                }

            </div>
        );
    };
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    selectedGym: state.selectedGym
});

export default connect(mapStateToProps, null)(NavigationBar);