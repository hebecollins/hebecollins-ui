import React from 'react';
import $ from 'jquery'
import {connect} from 'react-redux'
import {redirectByName} from "../../../Toolbox/Helpers/redirect";
import {getNotifications, getUnreadNotificationCount} from "../../../actions/notificationActions";
import classnames from 'classnames';
import Notification from "./Notification";
import {setDefaultGym} from "../../../actions/authActions";

/** Designs the navigation bar look
 * */
class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: '',
            count: '',
            showGyms: false,
            isClicked: false
        };
        this.notificationClicked = this.notificationClicked.bind(this);
        this.listGyms = this.listGyms.bind(this);
        this.selectGym = this.selectGym.bind(this);
    }


    componentWillMount() {
        if (this.props.isAuthenticated) {
            getUnreadNotificationCount().then(res => {
                this.setState({count: res.data.count});
            });
        }
    }

    componentDidMount() {

        $('.nav a').on('click', function (e) {
            $('.navbar-toggle').click()
        });

        $("[data-toggle='navHeaderCollapse']").click(
            function () {
                let selector = $(this).data("target");
                $(selector).toggleClass('in');
            }
        )
        ;
    }

    componentDidUpdate() {

        //it closes notification container if anywhere is clicked if it is opened
        if (this.state.isClicked) {
            const self = this;
            document.addEventListener("click", clickFunction);

            function clickFunction(e) {
                self.setState({isClicked: false});
                document.removeEventListener("click", clickFunction);
            }
        }
    }

    notificationClicked() {
        this.setState({isClicked: !this.state.isClicked, count: 0})
    }

    listGyms() {
        this.setState({showGyms: !this.state.showGyms})
    }

    selectGym(gym){
        this.props.setDefaultGym(gym);
        location.reload();
    }

    render() {
        const {count, isClicked, showGyms} = this.state;
        const nickName = this.props.user.nick_name;
        const gymList = this.props.user.gym_list;
        const gymName = this.props.selectedGym.gym_name;
        const locality = this.props.selectedGym.locality;
        const isAuthenticated = this.props.isAuthenticated;

        const gyms = () => {
            return (
                <div className="gym-list">
                    {gymList.map((gym, index) => {
                        return <div key={index}>
                            <a onClick={()=>this.selectGym(gym)} className="gym" >{gym.gym_name},{gym.locality}</a>
                        </div>
                    })}
                </div>
            )
        };

        const userDetails =
            <div className="nav-user-detail">
                <i className="nav-user-icon fa fa-user-o"/>
                <div className="nav-username">
                    {nickName}
                </div>
                <div className="nav-gymname flex">
                    {gymName},{locality}
                    {gymList && gymList.length > 1 ?
                        <div className="button" onClick={this.listGyms}>
                            <span className="caret"/>{
                                showGyms?gyms():<div/>
                        }
                        </div> :
                        <div/>}
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
                    <div id="navbar" className="nav-hebecollins-menu collapse2 navHeaderCollapse">
                        <div className="sm">
                            {isAuthenticated ? userDetails : <div/>}
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
                                <div className={count ? "notification-count" : "notification-count false"}>
                                    <span className="label label-notification">{count}</span>
                                </div>
                            </button>
                        </div>

                        {isClicked ?
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

export default connect(mapStateToProps, {setDefaultGym})(NavigationBar);