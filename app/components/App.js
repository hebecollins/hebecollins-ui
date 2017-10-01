import React from 'react';
import Greetings from './Greetings';
import NavigationBar from './NavigationBar';
import FlashMessageList from './flash/FlashMessageList'
import Description from "./hebecollins/Description";
import LoginAndSignup from "./hebecollins/LoginAndSignup";

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <NavigationBar/><br/><br/><br/><br/>
                <div className="col col-lg-8 col-md-8 hidden-sm hidden-xs">
                    <div className="col col-lg-9 col-md-9">
                        <Description/>
                    </div>
                </div>
                <div className="col col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <LoginAndSignup/>
                </div>
                <FlashMessageList/>
                {this.props.children}
            </div>
        );
    }
}

export default App;