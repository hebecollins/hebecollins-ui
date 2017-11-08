import React from 'react';
import {getRouteByName} from "../../../Toolbox/Helpers/routeHandler";

class NoRecordsFound extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="page-container">
                    <h1 className="white-center">NO RECORDS FOUND</h1>
                    <h1 className="white-center">
                        <a href={getRouteByName('HOME')}>Click here </a>
                        to return to home page</h1>
                </div>
            </div>
        );
    }
}

export default NoRecordsFound;