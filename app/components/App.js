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
                <Home/>
        );
    }
}

export default App;