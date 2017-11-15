import React from 'react';
import $ from 'jquery'
import {connect} from 'react-redux'

/** Designs the navigation bar look
 * */
class NavigationBar extends React.Component {

  componentDidMount(){

      console.log("this.props.user");
      console.log(this.props.user);
    // $('button').on('click', function(){
    //     alert('alert bro')
    // })
      $('.nav a').on('click', function(){
          $('.navbar-toggle').click() //bootstrap 3.x by Richard
      });

  }

    render() {

        const nickName = this.props.user.nick_name;
        return (
            <div className="navbar navbar-inverse">
                <div className="nav-hebecollins flex">
                    <button
                        className="navbar-toggle"
                        data-toggle="collapse"
                        data-target=".navHeaderCollapse">
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                    </button>
                    <div className="nav-hebecollins-menu collapse navHeaderCollapse">
                        <div>{this.props.children}</div>
                    </div>
                    <a href="/" className="hebecollins-home">
                        HEBECOLLINS
                    </a>

                </div>

                <div className="notification">
                    <div className="notification-icon">
                        <span className="fa fa-bell"/>
                        {nickName}
                    </div>
                    <div className="notification-count">
                        <span className="label label-notification">1</span>
                    </div>

                </div>
            </div>
        );
    };
}

const mapStateToProps=(state)=>({
    user:state.auth.user,
    selectedGym:state.selectedGym
});

export default connect(mapStateToProps ,null)(NavigationBar);