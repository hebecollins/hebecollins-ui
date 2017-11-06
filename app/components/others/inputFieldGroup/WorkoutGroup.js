import React from 'react'
import Workout from "./Workout"
import {validateExercise} from "../../../Toolbox/Validation/helpers"
import {dayOfWeek, deepCloneArray, scrollToError} from "../../../Toolbox/Helpers/extra";
import isEmpty from 'lodash/isEmpty'
import {Fade, Slide} from "../extra/Animation";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";

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
            index: 0, //it is the starting day number. For eg. 0 for sunday, 1 for monday
        };

        this.incrementCount = this.incrementCount.bind(this);
        this.onDayChange = this.onDayChange.bind(this);
        this.resetWorkoutState = this.resetWorkoutState.bind(this);
        this.onCut = this.onCut.bind(this);
        this.markAsRestDay = this.markAsRestDay.bind(this);
        this.addedToStore = this.addedToStore.bind(this);
    }


    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    componentWillMount(){
        this.checkStore(this.state.index);
    }

    incrementCount() {
        this.setState({exercise_count: this.state.exercise_count + 1})
    }

    /** when a cut icon is pressed, it remove that index of the array from dayWorkoutToBeStored,
     * and sets that to dayWorkoutToBeDisplayed, which in change gets reflected on the UI
     * @param i => index of the array dayWorkoutToBeStored
     */
    onCut(i) {
        let temp = deepCloneArray(this.state.dayWorkoutToBeStored);
        temp.splice(i, 1);

        //dayWorkoutToBeStored can be set equal to temp also but it doesn't matter as if it gets
        // equal to the workout(component) state again.
        this.setState({
            dayWorkoutToBeStored: [],
            dayWorkoutToBeDisplayed: temp,
            exercise_count: this.state.exercise_count - 1
        })
    }

    markAsRestDay() {
        this.setState({exercise_count: 0, dayWorkoutToBeStored: []})
    }

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

    addedToStore() {
        const {addWorkoutToRedux} = this.props;
        if (this.isValid()) {
            addWorkoutToRedux(this.state.dayWorkoutToBeStored, dayOfWeek(this.state.index));
            return true
        }
        return false
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

        scrollToError();
        const newDayIndex = (e.target.name === "next") ? ( this.state.index + 1 ) : (this.state.index - 1);
        if (this.addedToStore()) {
            const defaultState = this.resetWorkoutState();
            if (!this.checkStore(newDayIndex)) {
                this.setState({dayWorkoutToBeDisplayed: defaultState, dayWorkoutToBeStored: [], exercise_count: 2});
                console.log(this.state.dayWorkoutToBeStored)
            }
            this.setState({index: newDayIndex})
        }
    }

    checkStore(newDayIndex) {
        if (Object.keys(this.props.workout).includes(dayOfWeek(newDayIndex))) {
            let workout = this.props.workout[dayOfWeek(newDayIndex)];
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
                        <span className="badge">{i + 1}</span>
                        <div className="exercise-details">
                            <button className="close" onClick={() => this.onCut(i)}>
                                <span>&times;</span>
                            </button>
                            <Workout
                                dataToBeStored={dayWorkoutToBeStored}
                                id={i}
                                dataToBeDisplayed={dayWorkoutToBeDisplayed}/>
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
                {this.state.exercise_count ?
                    <div>
                        <div className="workout-group">
                            {/*<Slide>*/}
                            {getExerciseForm()}
                            {/*</Slide>*/}
                        </div>
                        <div className='pager'>
                            <button onClick={this.incrementCount} className="btn-hebecollins-orange">
                                <span className="glyphicon glyphicon-plus"/>
                                Add More
                            </button>
                            <button onClick={this.markAsRestDay} className="btn-hebecollins-orange">
                                Rest Day
                            </button>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="white-center">IT IS A REST DAY!</div>
                        <div className='pager'>
                            <button onClick={this.incrementCount} className="btn-hebecollins-orange">
                                Changed Your Mind ?
                            </button>
                        </div>
                    </div>}
                {daySet()}
            </div>
        )
    }
}

WorkoutGroup.propTypes = {
    onRef: React.PropTypes.func.isRequired,
    addWorkoutToRedux: React.PropTypes.func.isRequired,
    workout: React.PropTypes.object.isRequired,
};

export default WorkoutGroup;