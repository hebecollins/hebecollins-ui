import React from 'react';
import TrainerNavigation from '../dumb/trainer/TrainerNavigation';
require('../../css/alerts.css');
require('../../css/text.css');
require('../../css/formFields.css');
require('../../css/contentBox.css');
require('../../css/images.css');
require('../../css/dateTime.css');


class TrainerApp extends React.Component {
    render() {
        return (
            <div className="hebecollins-home">
                <TrainerNavigation/>
                <div className="hebecollins-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default TrainerApp;