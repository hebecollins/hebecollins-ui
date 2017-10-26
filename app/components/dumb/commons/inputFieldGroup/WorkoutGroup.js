import React from 'react'
import Workout from "../../../dumb/commons/inputFieldGroup/Workout"
import {validateExercise} from "../../../../Toolbox/Validation/helpers"
import {addWorkoutToRedux} from "../../../../actions/commons/workoutActions"
import {connect} from 'react-redux'

//represents one day's workout
class WorkoutGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            exercise_count: 1,
            dayWorkout: [], //for storing workout
            isValid: true,
            dayName: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
            index: 0

        };
        this.incrementCount = this.incrementCount.bind(this);
        this.onDayChange = this.onDayChange.bind(this);
    }


    incrementCount() {
        this.setState({exercise_count: this.state.exercise_count + 1})
    }

    onDayChange(e) {
        let temp = this.state.dayWorkout;
        let valid = true;//just temporarily
        temp.map((state) => {
                let {errors, isValid} = validateExercise(state);
                state.errors = errors;
                if (!isValid) {
                    valid = false;
                }
                return state;
            }
        );


        /**call for validation for states that belongs to workout component*/
        this.setState({dayWorkout: temp});


        /**if valid, format it, write to redux and empty all the states*/
        if (valid) {
            const isStored =
                this.props.addWorkoutToRedux(this.state.dayWorkout, this.state.dayName[dayOfWeek(this.state.index)]);

            if (isStored) {
                const newState = this.state.dayWorkout.map(state => {
                        state.exercise_name = "";
                        state.errors = "";
                        state.sets = "";
                        state.reps = {};
                        state.rest = "";
                        return state;
                    }
                );

                    this.setState({dayWorkout: newState, exercise_count: 1});
            }

            if (e.target.name === "next") {
                this.setState({index: this.state.index + 1})
            } else {
                this.setState({index: this.state.index - 1})
            }

        }
    }

    render() {
        const {dayName, index, exercise_count} = this.state;
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
            <div className="content">
                <div className="white-center">Enter the workout schedule</div>

                {getExerciseForm()}

                <div className='pager'>
                    <button onClick={this.incrementCount} className="btn-hebecollins-black">
                        Add More
                    </button>
                </div>
                <div className="pager">
                    <button onClick={this.onDayChange}
                            name="back"
                            className="btn-hebecollins-black">{dayName[dayOfWeek(index - 1)]}
                    </button>
                    <button onClick={this.onDayChange}
                            name="next"
                            className="btn-hebecollins-black">{dayName[dayOfWeek(index + 1)]}
                    </button>
                </div>
            </div>
        )
    }
}

WorkoutGroup.propTypes = {
    addWorkoutToRedux: React.PropTypes.func.isRequired
};

const dayOfWeek = (i) => {
    if (i % 7 < 0)
        return 7 + i % 7;
    else
        return i % 7;
};

export default connect(null, {addWorkoutToRedux})(WorkoutGroup);