import React from 'react';
import $ from 'jquery'
import {connect} from 'react-redux'
import {redirectByName} from "../../../Toolbox/Helpers/redirect";

/** Designs the navigation bar look
 * */
class NavigationBar extends React.Component {

    componentDidMount() {
        // $('button').on('click', function(){
        //     alert('alert bro')
        // })
        $('.nav a').on('click', function () {
            $('.navbar-toggle').click() //bootstrap 3.x by Richard
        });

        $("[data-toggle='navHeaderCollapse']").click(function() {
            let selector = $(this).data("target");
            $(selector).toggleClass('in');
        });
    }


    render() {

        const nickName = this.props.user.nick_name;
        const gymName = this.props.selectedGym.gym_name;
        const locality = this.props.selectedGym.locality;
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
                    <a onClick={()=>redirectByName("HOME")} className="hebecollins-home">
                        HEBECOLLINS
                    </a>
                </div>

                {nickName ?
                    <div className="notification true">{/*need to put a check and pass notifications*/}
                        <div className="lg">
                            {userDetails}
                        </div>
                        <div className="notification-icon">
                            <span className="fa fa-bell"/>
                        </div>
                        <div className="notification-count">
                            <span className="label label-notification">1</span>
                        </div>
                    </div>
                    : <div/>
                }
            </div>
        );
    };
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    selectedGym: state.selectedGym
});

export default connect(mapStateToProps, null)(NavigationBar);