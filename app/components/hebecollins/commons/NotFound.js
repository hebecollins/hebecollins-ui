import React from 'react';
import {getRouteByName} from "../../../Toolbox/Helpers/routeHandler";

class NotFound extends React.Component {
    render() {
        return (
            <div className="page-container">
                <h1 className="white-center">404 Page Not Found</h1>
                <h1 className="white-center">
                    <a href={getRouteByName('GUEST_HOME')}>Click here </a>
                    to redirect to home page</h1>
            </div>
        );
    }
}

export default NotFound;