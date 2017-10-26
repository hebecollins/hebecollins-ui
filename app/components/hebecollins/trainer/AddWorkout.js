import React from 'react'
import SingleScreen from "../../dumb/commons/templates/SingleScreen";
import WorkoutGroup from "../../dumb/commons/inputFieldGroup/WorkoutGroup";
import {addWorkoutToRedux} from "../../../actions/commons/workoutActions"
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
        const {addWorkoutToRedux, workout}=this.props;
        return (
            <div className="content">
                <SingleScreen>
                <WorkoutGroup addWorkoutToRedux={addWorkoutToRedux} workout={workout}/>
                </SingleScreen>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        workout: state.workout.workout
    }
}

export default connect(mapStateToProps, {addWorkoutToRedux})(AddWorkout)