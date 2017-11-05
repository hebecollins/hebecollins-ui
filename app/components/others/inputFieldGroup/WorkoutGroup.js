import React from 'react'
import Workout from "./Workout"
import {validateExercise} from "../../../Toolbox/Validation/helpers"
import {dayOfWeek, deepCloneArray} from "../../../Toolbox/Helpers/extra";
import isEmpty from 'lodash/isEmpty'
import {Fade, Slide} from "../extra/Animation";

/**It represents one day's workout
 * Working: It has got two main states, 'dayWorkoutToBeStored' and 'dayWorkoutToBeDisplayed'.(these two must be passed as props)
 *          dayWorkoutToBeStored (incoming) => it is the received data which is meant to be stored
 *          dayWorkoutToBeDisplayed (outgoing) => it is the sent data which is meant to be displayed
 * */
class WorkoutGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            exercise_count: 2,
            dayWorkoutToBeStored: [], //received from workout component
            dayWorkoutToBeDisplayed: [], //sent to workout component
            index: 0 //it is the starting day number. For eg. 0 for sunday, 1 for monday
        };

        this.incrementCount = this.incrementCount.bind(this);
        this.onDayChange = this.onDayChange.bind(this);
        this.resetWorkoutState = this.resetWorkoutState.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCut= this.onCut.bind(this);
    }

    incrementCount() {
        this.setState({exercise_count: this.state.exercise_count + 1})
    }

    onCut(i){}

    /** Clone dayWorkoutToBeStored -> validate and append errors to the clone -> sets dayWorkoutToBeStored as the clone
     *  @return bool => true if valid else false
     */
    isValid() {

        let temp = deepCloneArray(this.state.dayWorkoutToBeStored);
        let valid = true;
        temp.map((state) => {
                let {errors, isValid} = validateExercise(state);
                state.errors = errors;
                if (!isValid) {
                    valid = false;
                }
                return state
            }
        );

        this.setState({dayWorkoutToBeDisplayed: temp});
        return valid;
    }


    onSubmit() {
        const {addWorkoutToRedux, addWorkoutToServer, gymId, workout} = this.props
        if (this.isValid()) {
            const isSuccess =
                addWorkoutToRedux(this.state.dayWorkoutToBeStored, dayOfWeek(this.state.index));
            console.log(isSuccess);
            if (isSuccess) {
                const clientId = "something";
                addWorkoutToServer(workout, gymId, clientId);
            }
        }
    }

    resetWorkoutState() {
        let temp = [];
        for (let i = 0; i < this.state.exercise_count; i++) {
            temp[i] = {
                exercise_name: "",
                sets: "",
                reps: {},
                rest: "",
                errors: ""
            }
        }
        return temp;
    }


    /**if data is valid, It writes to redux and empty all the states*/
    onDayChange(e) {

        const followup = (e.target.name === "next") ? ( this.state.index + 1 ) : (this.state.index - 1);
        if (this.isValid()) {
            console.log(this.state.dayWorkoutToBeDisplayed);
            const isSuccess =
                this.props.addWorkoutToRedux(this.state.dayWorkoutToBeStored, dayOfWeek(this.state.index));

            if (isSuccess) {//to make change in state wait until action is successful
                //to make states in workout component as empty
                //it is basically the return part from workout
                const defaultState = this.resetWorkoutState();
                if (!this.checkStore(followup)) {
                    this.setState({dayWorkoutToBeDisplayed: defaultState, dayWorkoutToBeStored: [], exercise_count: 2});
                    console.log(this.state.dayWorkoutToBeStored)
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
                    state['errors'] = "";
                    return state
                }
            );
            this.setState({dayWorkoutToBeDisplayed: t, dayWorkoutToBeStored: [], exercise_count: workout.length});
            return true
        } else {
            return false
        }

    }

    render() {

        const {index, exercise_count, dayWorkoutToBeDisplayed, dayWorkoutToBeStored} = this.state;
        const getExerciseForm = () => {
            let exerciseForm = [];
            for (let i = 0; i < exercise_count; i++) {
                exerciseForm.push(
                    <div className="exercise-control" key={i}>
                        <span className="badge">{i}</span>
                        <div className="exercise-details">
                            <button className="close" onClick={()=>this.onCut(exerciseForm,i)}>
                                <span>&times;</span>
                            </button>
                            <Workout
                                dataToBeStored={dayWorkoutToBeStored}
                                id={i}
                                dataToBeDisplayed={dayWorkoutToBeDisplayed}
                            />
                        </div>
                    </div>
                )
            }
            return exerciseForm;
        };

        const daySet = () => (
            <div className="pager">
                <hr/>
                <a onClick={this.onDayChange} name="back" className="day-link pull-left">
                    <span className="glyphicon glyphicon-triangle-left"/>
                    {dayOfWeek(index - 1, true)}
                </a>

                <label className="day">{dayOfWeek(index, true)}</label>

                <a onClick={this.onDayChange} name="next" className="day-link pull-right">
                    {dayOfWeek(index + 1, true)}
                    <span className="glyphicon glyphicon-triangle-right"/></a>
                <hr/>
            </div>);

        return (
            <div>
                {daySet()}
                <div className="workout-group">
                    <Slide>
                        {getExerciseForm()}
                    </Slide>
                </div>
                <div className='pager'>
                    <button onClick={this.incrementCount} className="btn-hebecollins-orange">
                        <span className="glyphicon glyphicon-plus"/>
                        Add More
                    </button>
                </div>
                {daySet()}
                <div className='pager'>
                    <button className="btn-hebecollins-orange" onClick={this.onSubmit}>Submit</button>
                </div>
            </div>
        )
    }
}

WorkoutGroup.propTypes = {
    addWorkoutToRedux: React.PropTypes.func.isRequired,
    workout: React.PropTypes.object.isRequired,
    gymId: React.PropTypes.string.isRequired,
    addWorkoutToServer: React.PropTypes.func.isRequired,
};

export default WorkoutGroup;