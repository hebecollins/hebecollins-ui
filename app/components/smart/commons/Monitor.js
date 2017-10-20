import React from 'react';
import AddTrainers from './AddUsersInBulk'
import {connect} from 'react-redux';

//for country code flag with mobile no.
import IntlTelInput from 'react-intl-tel-input';
import 'file?name=libphonenumber.js!../../../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import './../../../../node_modules/react-intl-tel-input/dist/main.css';
import {ADD_TRAINERS} from "../../../actions/types";

class Monitor extends React.Component {
    constructor(props) {
        super(props);
        this.component = this.component.bind(this);
    }

    component() {
        return (<h1>
            <ul>
                {
                    this.props.trainer && this.props.trainer.trainers.map(trainers => {
                        console.log(trainers.nick_name);
                        return (
                            <div className="alert alert-danger">
                                <h4>Nick Name:{trainers.nick_name}</h4>
                                <h4>Email:{trainers.email}</h4>
                                <h4>Mobile No.:{trainers.mobile}</h4>
                            </div>)
                    })
                }
            </ul>
        </h1>)
    }

    render() {
        return (
            <div className="row">
                <div className="col col-lg-6">
                    <AddTrainers/>
                </div>
                <div className="col col-lg-6 container-fluid">
                    <div>
                        <div className="hebecollins-scroll-monitor">
                            {this.component()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        trainer: state.addUsers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTrainer: (trainer) => {
            dispatch({
                type: ADD_TRAINERS,
                trainers: trainer//or this.state
            })
        }
    }
};

export default connect(mapStateToProps, null)(Monitor);
