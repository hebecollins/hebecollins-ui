import React from 'react'
import {getCurrentWorkoutToRedux} from "../../../actions/workoutActions";
import {connect} from 'react-redux'
import {currentDayOfWeek, dayOfWeek, deepCloneArray} from "../../../Toolbox/Helpers/extra";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";


class GetCurrentWorkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dayWorkout: [],
            index: 0,
            hasServerResponded: false
        };
        this.getWorkout = this.getWorkout.bind(this)
    }

    componentWillMount() {
        const {gymId, getCurrentWorkoutToRedux} = this.props;
        getCurrentWorkoutToRedux(gymId).then((res) => {
            this.setState({index: currentDayOfWeek(), hasServerResponded: true});
            this.getWorkout()

        }).catch(err => {
            this.setState({hasServerResponded: true});
            errorResponse(err)
        })
    }

    getWorkout() {
        const workout = deepCloneArray(this.props.workout);
        const currentDay = "mon";
        console.log("getWorkout()");
        // dayOfWeek(this.state.index);
        this.setState({dayWorkout: workout[currentDay]})
    }

    render() {
        console.log(this.state);
        console.log("render");
        const {dayWorkout} = this.state;

        const renderWorkout = dayWorkout.map((exercise, index)=>{
            return <div key={index} className="white-center">{exercise.exercise_name}</div>
        });

        return (
            <div className="content">
                <div className="white-center">{renderWorkout}</div>
            </div>
        )

    }
}

const mapStateToProps = (state) => ({
    gymId: state.selectedGym.gym_id,
    workout: state.workout.workout
});

const mapDispatchToProps = {
    getCurrentWorkoutToRedux
};

export default connect(mapStateToProps, mapDispatchToProps)(GetCurrentWorkout);