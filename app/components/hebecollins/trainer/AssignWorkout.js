import React from 'react'
import WorkoutGroup from "../../others/inputFieldGroup/WorkoutGroup";
import {addWorkoutToRedux, addAssignedWorkoutToServer, clearWorkoutFromRedux} from "../../../actions/workoutActions"
import {connect} from 'react-redux'
import SingleScreen2 from "../../others/frames/SingleScreen2";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {redirectByName} from "../../../Toolbox/Helpers/redirect";
import {scrollToError} from "../../../Toolbox/Helpers/extra";

class AssignWorkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        //its an async action which scrolls to error blocks if there is any on the page
        scrollToError();
        const self = this;
        if (this.child.addedToStore()) {

            //setTimeout holds the execution of below method for sometime so that redux updates can be reflected here
            setTimeout(() => {
                const {addAssignedWorkoutToServer, selectedUser, gymId, workout} = self.props;
                const clientId = selectedUser.user_id;
                addAssignedWorkoutToServer(workout, gymId, clientId).catch(
                    err => {
                        errorResponse(err);
                        this.setState({isLoading: false});
                    }
                )
            }, 100)
        }
    };

    //delete workout from redux once component is unmounted
    componentWillUnmount() {
        this.props.clearWorkoutFromRedux();
    }

    render() {
        const {workout, selectedUser, addWorkoutToRedux} = this.props;
        return (
            <div className="content">
                <SingleScreen2>
                    <div className="white-center">
                        Workout schedule for <label className="list-monitor-header">{selectedUser.nick_name}</label>
                    </div>
                    <a onClick={() => redirectByName("SAVED_WORKOUT_LIST")} className="edit-icon-link pull-right">Use
                        saved
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

export default connect(mapStateToProps, {
    addWorkoutToRedux,
    clearWorkoutFromRedux,
    addAssignedWorkoutToServer
})(AssignWorkout)