import React from 'react';
import Greetings from './Greetings';
import NavigationBar from './NavigationBar';
import FlashMessageList from './flash/FlashMessageList'
import Description from "./hebecollins/Description";
import LoginAndSignup from "./hebecollins/LoginAndSignup";
import Navigation from './common/Navigation';
import { Link } from 'react-router';
import Home from "./hebecollins/Home";


class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Home/>
                <FlashMessageList/>
                <div className="col col-lg-8 col-md-8 col-sm-6 hidden-xs">
                    <div className="col col-lg-9 col-md-9">
                        <Description/>
                    </div>
                </div>
                <div className="col col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <LoginAndSignup/>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default App;