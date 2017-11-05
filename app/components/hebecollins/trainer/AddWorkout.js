import React from 'react'
import SingleScreen from "../../others/frames/SingleScreen";
import WorkoutGroup from "../../others/inputFieldGroup/WorkoutGroup";
import {addWorkoutToRedux, addWorkoutToServer} from "../../../actions/workoutActions"
import {connect} from 'react-redux'
import SingleScreen2 from "../../others/frames/SingleScreen2";

class AddWorkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: "",
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {

    }

    render() {
        const {gymId, workout, selectedUser,addWorkoutToRedux,addWorkoutToServer} = this.props;
        return (
            <div className="content">
                <SingleScreen2>
                    <div className="white-center">
                        Workout schedule for <label className="list-monitor-header">{selectedUser.nick_name}</label>
                    </div>
                    <a className="edit-icon-link pull-right">Use saved workouts instead ?</a>
                    <WorkoutGroup
                        addWorkoutToRedux={addWorkoutToRedux}
                        workout={workout}
                        clientId={selectedUser.client_id}
                        gymId={gymId}
                        addWorkoutToServer={addWorkoutToServer}/>
                </SingleScreen2>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        workout: state.workout.workout,
        gymId: state.selectedGym.gym_id,
        selectedUser: state.selectedUser
    }
}

export default connect(mapStateToProps, {addWorkoutToRedux, addWorkoutToServer})(AddWorkout)