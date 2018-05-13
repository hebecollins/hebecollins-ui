import React from 'react'
import {getSelectedClientWorkoutToRedux} from "../../../actions/workoutActions";
import {connect} from 'react-redux'
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {Loading} from "../../others/extra/Loading"
import DisplayWorkout from "../../others/display/DisplayWorkout";
import {clearWorkout} from "../../../actions/actionStore";
import {redirectByName} from "../../../Toolbox/Helpers/redirect";

class ViewWorkoutForSelectedClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            hasServerResponded: false,
        };
    }

    componentWillMount() {
        const {gymId, getSelectedClientWorkoutToRedux, selectedUser} = this.props;
        const clientId = selectedUser.user_id;
        getSelectedClientWorkoutToRedux(gymId, clientId).then((res) => {
            this.setState({hasServerResponded: true});

        }).catch(err => {
            this.setState({hasServerResponded: true});
            errorResponse(err)
        })
    }

    //delete workout from redux once component is unmounted
    componentWillUnmount() {
        this.props.clearWorkout();
    }

    render() {
        const {gymId, workout, selectedUser} = this.props;
        return (
            this.state.hasServerResponded ? <div className="quote-box content">
                <div className="horizontal-padding">
                <h1 className="white-center">
                    Workout schedule for <label className="list-monitor-header">{selectedUser.nick_name}</label>
                </h1>

                <a onClick={() => redirectByName("EDIT_VIEWED_WORKOUT")} className="top-right edit-icon-link">
                    <h3><span className="glyphicon glyphicon-edit">edit</span></h3>
                </a>

                <DisplayWorkout gymId={gymId} workout={workout} index={this.state.index}/>
                </div></div> : <Loading/>
        )
    }
}

const mapStateToProps = (state) => ({
    gymId: state.selectedGym.gym_id,
    selectedUser: state.selectedUser,
    workout: state.workout.workout
});

const mapDispatchToProps = {
    getSelectedClientWorkoutToRedux,
    clearWorkout
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewWorkoutForSelectedClient);