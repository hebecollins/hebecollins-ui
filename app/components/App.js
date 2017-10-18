import React from 'react';
import Navigation from './smart/commons/Navigation'
import FlashMessageList from './smart/commons/FlashMessageList';
import Footer from "./dumb/commons/Footer";
import {Link} from 'react-router'
import GuestNavigation from "./dumb/guest/GuestNavigation";
require('../css/alerts.css');
require('../css/text.css');
require('../css/formFields.css');
require('../css/contentBox.css');
require('../css/images.css');
require('../css/dateTime.css');


class App extends React.Component {
    // static propTypes = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="page">
                <Navigation/>
                {/*<GuestNavigation/>*/}
                <div id="flash-message">
                    <FlashMessageList/>
                </div>
                <div id="content">
                    {/*<Link to="/" activeClassName="active">home</Link>*/}
                    {this.props.children}
                </div>
                <div id="footer">
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default App;