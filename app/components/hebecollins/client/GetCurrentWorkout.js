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
        const currentDay = dayOfWeek(this.state.index);
        this.setState({dayWorkout: workout[currentDay]})
    }

    render() {
        const {dayWorkout} = this.state;

        const renderWorkout = dayWorkout.map((exercise, i) => {
            return <div key={i} className="exercise-control">
                <span className="badge exercise-badge">{i + 1}</span>
                <div className="exercise-details flex">
                    <div className="exercise-text">
                        <div className="orange-header">{exercise.exercise_name}</div>
                        <div className="exercise-body">
                            <div>
                                <div>
                                    <label className="field">Sets :</label>
                                    <label className="light-orange value">{exercise.sets}</label>
                                </div>
                                <div>
                                    <label className="field">Reps :</label>
                                    <label className="light-orange value">
                                        {Object.keys(exercise.reps).map((key) => (
                                            <label key={key} className="light-orange value">
                                                {exercise.reps[key]}
                                            </label>
                                        ))}
                                    </label>
                                </div>
                                <div>
                                    <label className="field">Rest :</label>
                                    <label className="light-orange value">{exercise.rest} seconds</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="exercise-icons pull-right">
                        <div className="exercise-icon">
                        <img className="pull-right" src={require('./../../../../images/machine_icon.png')}/></div>
                        <button className="video-icon btn-hebecollins-orange pull-right"><span
                            className="glyphicon glyphicon-facetime-video"/></button>
                    </div>
                </div>
            </div>
        });

        return (
            <div className="quote-box content">
                <div className="horizontal-padding">
                <div className="workout-group">
                    {renderWorkout}
                </div>
                </div>
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