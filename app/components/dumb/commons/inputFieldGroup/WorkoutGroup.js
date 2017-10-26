import React from 'react'
import Workout from "../../../dumb/commons/inputFieldGroup/Workout"
import {validateExercise} from "../../../../Toolbox/Validation/helpers"
import {addWorkoutToRedux} from "../../../../actions/commons/workoutActions"
import {connect} from 'react-redux'
import {dayOfWeek, deepCloneArray} from "../../../../Toolbox/Helpers/extra";

//represents one day's workout
class WorkoutGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            exercise_count: 1,
            dayWorkout: [], //for storing workout
            index: 0//it is the starting day number. For eg. 0 for sunday, 1 for monday
        };

        this.incrementCount = this.incrementCount.bind(this);
        this.onDayChange = this.onDayChange.bind(this);
    }

    incrementCount() {
        this.setState({exercise_count: this.state.exercise_count + 1})
    }

    isValid() {
        let temp = this.state.dayWorkout;
        let valid = true;//just temporarily
        temp.map((state) => {
                let {errors, isValid} = validateExercise(state);
                state.errors = errors;
                if (!isValid) {
                    valid = false;
                }
            }
        );

        /**call for validation for states that belongs to workout component
         * Setting state will populate the error states in workout component if there is any error*/
        this.setState({dayWorkout: temp});

        return valid;
    }

    /**if data is valid, It writes to redux and empty all the states*/
    onDayChange(e) {

        if (this.isValid()) {
            const isSuccess =
                this.props.addWorkoutToRedux(this.state.dayWorkout, dayOfWeek(this.state.index));
            const followup = (e.target.name === "next") ? ( this.state.index + 1 ) : (this.state.index - 1);
            if (isSuccess) {//to make change in state wait until action is successful
                //to make states in workout component as empty
                if (!this.checkStore(followup)) {
                    this.state.dayWorkout.map(state => {
                            state.exercise_name = "";
                            state.errors = "";
                            state.sets = "";
                            state.reps = {};
                            state.rest = "";
                            return state;
                        }
                    );
                    this.setState({dayWorkout: [], exercise_count: 1});
                }
            }
            this.setState({index: followup})
        }
    }

    checkStore(followup) {
        if (Object.keys(this.props.workout).includes(dayOfWeek(followup))) {
            console.log("inside if");
            let workout = this.props.workout[dayOfWeek(followup)];
            let temp = deepCloneArray(workout);
            let t = temp.map(state => {
                    state['error'] = {};
                    return state
                }
            );

            this.state.dayWorkout.map(state => {
                    state.exercise_name = "";
                    state.errors = "";
                    state.sets = "";
                    state.reps = {};
                    state.rest = "";
                    return state;
                }
            );
            this.state.dayWorkout = [];
            // console.log(workout);
            this.setState({ dayWorkout:t, exercise_count: workout.length}, () => {
                console.log(workout);
                console.log(t);
                console.log(this.state.dayWorkout)
            });
            // console.log(t);
            console.log(dayOfWeek(followup));
            // console.log(this.props.workout);
            return true
        } else {
            return false
        }

    }

    render() {
        const {index, exercise_count} = this.state;
        const getExerciseForm = () => {
            let exerciseForm = [];
            for (let i = 0; i < exercise_count; i++) {
                exerciseForm.push(
                    <div key={i}><span className="badge">{i + 1}</span>
                        <Workout
                            day={this.state.dayWorkout}
                            id={i}
                        />
                    </div>)
            }
            return exerciseForm;
        };

        return (
            <div>
                <div className="white-center">Enter the workout schedule</div>
                <h1 className="white-center">{dayOfWeek(index)}</h1>
                {getExerciseForm()}
                <div className='pager'>
                    <button onClick={this.incrementCount} className="btn-hebecollins-black">
                        Add More
                    </button>
                </div>
                <div className="pager">
                    <button onClick={this.onDayChange}
                            name="back"
                            className="btn-hebecollins-black">{dayOfWeek(index - 1)}
                    </button>
                    <button onClick={this.onDayChange}
                            name="next"
                            className="btn-hebecollins-black">{dayOfWeek(index + 1)}
                    </button>
                    <h1 className="white-center">{dayOfWeek(index)}</h1>
                </div>
            </div>
        )
    }
}

WorkoutGroup.propTypes = {
    addWorkoutToRedux: React.PropTypes.func.isRequired,
    workout: React.PropTypes.object.isRequired,
};

export default WorkoutGroup;