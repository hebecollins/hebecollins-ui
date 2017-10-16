import React from 'react';
import Navigation from './smart/commons/Navigation'
import FlashMessageList from './smart/commons/FlashMessageList';

require('../css/alerts.css');
require('../css/text.css');
require('../css/formFields.css');
require('../css/contentBox.css');
require('../css/images.css');
require('../css/dateTime.css');


class App extends React.Component {
    render() {
        return (
            <div id="page">
                <Navigation/>
                <div id="flash-message">
                    <FlashMessageList/>
                </div>
                <div id="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;