import React from 'react';
import {getRouteByName} from "../../../Toolbox/Helpers/routeHandler";

class ViewWorkout extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="page-container">
                    <h1 className="white-center">Under Construction</h1>
                    <h1 className="white-center">
                        <a href={getRouteByName('GUEST_HOME')}>Click here </a>
                        to redirect to home page</h1>
                </div>
            </div>
        );
    }
}

export default ViewWorkout;