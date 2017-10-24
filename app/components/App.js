import React from 'react';
import Navigation from './smart/commons/Navigation'
import FlashMessageList from './smart/commons/FlashMessageList';
import Footer from "./dumb/commons/templates/Footer";

require('../Toolbox/css/alerts.css');
require('../Toolbox/css/text.css');
require('../Toolbox/css/formFields.css');
require('../Toolbox/css/contentBox.css');
require('../Toolbox/css/images.css');
require('../Toolbox/css/dateTime.css');
require('../Toolbox/css/font-awesome.min.css');
require('../Toolbox/css/animation.css');


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="page">
                <div className="layer">
                    <Navigation/>
                    {/*<GuestNavigation/>*/}
                    <div id="flash-message">
                        <FlashMessageList/>
                    </div>
                        {this.props.children}
                    <div id="footer">
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;