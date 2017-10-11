import React from 'react';
import Navigation from './common/Navigation';
require('./../css/alerts.css');
require('./../css/text.css');
require('./../css/formFields.css');
require('./../css/contentBox.css');
require('./../css/images.css');

class App extends React.Component {
    render() {
        return (
            <div className="hebecollins-home">
                <Navigation/>
                <div className="hebecollins-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;