import React from 'react';
import ClientNavigation from './client/ClientNavigation';
require('./../css/alerts.css');
require('./../css/text.css');
require('./../css/formFields.css');
require('./../css/contentBox.css');
require('./../css/images.css');
require('./../css/dateTime.css');


class ClientApp extends React.Component {
    render() {
        return (
            <div className="hebecollins-home">
                <ClientNavigation/>
                <div className="hebecollins-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default ClientApp;