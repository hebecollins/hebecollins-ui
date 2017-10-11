import React from 'react';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';
import AddTrainers from './../manager/AddTrainers'
import {connect} from 'react-redux';
//for country code flag with mobile no.
import IntlTelInput from 'react-intl-tel-input';
import 'file?name=libphonenumber.js!./../../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import './../../../node_modules/react-intl-tel-input/dist/main.css';
import {ADD_TRAINERS} from "../../actions/types";
import addUsers from './../../reducers/addUsers'

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.component = this.component.bind(this);
    }

    component() {
        console.log("see=>");
        return (<h1>
            <ul>
                {
                    this.props.trainer && this.props.trainer.trainers.map(trainers => {
                        console.log(trainers.nick_name);
                        // console.log("see=>"+trainers);
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
        console.log("hello");
        console.log(this.props.trainer.trainers);
        // const trainer = this.props.trainer.map(a=>a.nick_name);
        // console.log(trainer );
        return (
            <div className="row">
                <div className="col col-lg-6">
                    <AddTrainers/>
                </div>
                <div className="col col-lg-6 container-fluid">
                    {/*<h1><component/></h1>*/}
                    <div>
                        <div>{this.component()}</div>
                    </div>
                </div>
            </div>
        );
    }
}

// Notification.propTypes = {
//     onChange: React.PropTypes.func.isRequired,
//     handleMobileNo: React.PropTypes.func.isRequired,
//     state: React.PropTypes.object.isRequired
// };
const mapStateToProps = (state) => {
    return {
        trainer: state.addUsers
    }
};//which properties we want from redux

const mapDispatchToProps = (dispatch) => {
    return {
        addTrainer: (trainer) => {
            dispatch({
                type: ADD_TRAINERS,
                trainers: trainer//or this.state
            })
        }
    }
};//which actions we want to dispatch to redux


export default connect(mapStateToProps, null)(Notification);
