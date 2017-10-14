import React from 'react';
import ManagerNavigation from '../dumb/manager/ManagerNavigation';
require('../../css/alerts.css');
require('../../css/text.css');
require('../../css/formFields.css');
require('../../css/contentBox.css');
require('../../css/images.css');
require('../../css/dateTime.css');


class ManagerApp extends React.Component {
    render() {
        return (
            <div className="hebecollins-home">
                <ManagerNavigation/>
                <div className="hebecollins-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default ManagerApp;