import React from 'react'
import SingleScreen from "../../others/frames/SingleScreen";
import WorkoutGroup from "../../others/inputFieldGroup/WorkoutGroup";
import {addWorkoutToRedux,addWorkoutToServer} from "../../../actions/workoutActions"
import {connect} from 'react-redux'

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
        const {addWorkoutToRedux,user, workout, addWorkoutToServer}=this.props;
        return (
            <div className="content">
                <SingleScreen>
                <WorkoutGroup
                    addWorkoutToRedux={addWorkoutToRedux}
                    workout={workout}
                    user={user}
                    addWorkoutToServer={addWorkoutToServer}/>
                </SingleScreen>
            </div>
        )
    }
}


//TODO:INTEGRATING choose gym
function mapStateToProps(state) {
    return {
        workout: state.workout.workout,
        user:state.auth.user
    }
}

export default connect(mapStateToProps, {addWorkoutToRedux,addWorkoutToServer})(AddWorkout)