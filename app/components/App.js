import React from 'react';
import Home from "./hebecollins/Home";
import AddUser from "./common/AddUser";
import AddTrainers from "./manager/AddTrainers";
import Navigation from './common/Navigation';

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Navigation/>
                {this.props.children}
                {/*<AddTrainers/>*/}
            </div>
        );
    }
}

export default App;