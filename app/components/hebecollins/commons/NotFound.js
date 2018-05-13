import React from 'react';
import {getRouteByName} from "../../../Toolbox/Helpers/routeHandler";

class NotFound extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="page-container">
                    <h1 className="white-center">404 Page Not Found</h1>
                    <h1 className="white-center">
                        <a href={getRouteByName('HOME')}>Click here </a>
                        to redirect to home page</h1>
                </div>
            </div>
        );
    }
}

export default NotFound;