import React from 'react'
import WorkoutGroup from "../../others/inputFieldGroup/WorkoutGroup";
import {addWorkoutToRedux, addAssignedWorkoutToServer} from "../../../actions/workoutActions"
import {connect} from 'react-redux'
import SingleScreen2 from "../../others/frames/SingleScreen2";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {redirectByName} from "../../../Toolbox/Helpers/redirect";

class AssignWorkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        const {addAssignedWorkoutToServer, selectedUser, gymId, workout} = this.props;
        const clientId = selectedUser.user_id;
        if (this.child.addedToStore()) {
            addAssignedWorkoutToServer(workout, gymId, clientId).catch(
                err => {
                    errorResponse(err);
                    this.setState({isLoading: false});
                }
            );
        }
    };

    render() {
        const {workout, selectedUser, addWorkoutToRedux} = this.props;
        return (
            <div className="content">
                <SingleScreen2>
                    <div className="white-center">
                        Workout schedule for <label className="list-monitor-header">{selectedUser.nick_name}</label>
                    </div>
                    <a onClick={() => redirectByName("CREATE_WORKOUT")} className="edit-icon-link pull-right">Use saved
                        workouts instead ?</a>
                    <WorkoutGroup
                        onRef={ref => (this.child = ref)}
                        addWorkoutToRedux={addWorkoutToRedux}
                        workout={workout}
                    />
                    <div className='pager'>
                        <button className="btn-hebecollins-orange" onClick={this.onSubmit}>
                            Assign this workout to {selectedUser.nick_name}
                        </button>
                    </div>
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

export default connect(mapStateToProps, {addWorkoutToRedux, addAssignedWorkoutToServer})(AssignWorkout)