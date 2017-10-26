import React from 'react'
import Workout from "../../../dumb/commons/inputFieldGroup/Workout"
import {validateExercise} from "../../../../Toolbox/Validation/helpers"
import {addWorkoutToRedux} from "../../../../actions/commons/workoutActions"
import {connect} from 'react-redux'
import {deepClone, deepCloneArray} from "../../../../Toolbox/Helpers/clone";

//represents one day's workout
class WorkoutGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: "",
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
        let temp = deepCloneArray(this.state.dayWorkout);//using jQuery for deep copying
        let valid = true;//just temporarily
        console.log("=======================================");
        console.log(temp);
        // console.log(dayWorkout);
        console.log("=======================================");
        let p = temp.map((state) => {
                let {errors, isValid} = validateExercise(state);
                state.errors = errors;
                if (!isValid) {
                    valid = false;
                }
                return state;
            }
        );

        console.log("ppppp=========================");
        console.log(p);
        // console.log(dayWorkout);
        console.log("=======================================");


        /**call for validation for states that belongs to workout component*/
        this.setState({dayWorkout: p});

        //
        // /**if valid, format it, write to redux and empty all the states*/
        // if (valid) {
        //
        //     let temp2 = $.extend(true, [], this.state.dayWorkout);;
        //         //needs a method which takes the input as (day, state) and format it like {workout:{day:[dayWorkout]}}
        //
        //     // this.props.addWorkoutToRedux(this.state.dayWorkout,this.state.dayName[dayOfWeek(this.state.index)]);
        //     temp2.map(state => {
        //             state.exercise_name = "";
        //             state.errors = "something";
        //             state.sets = "";
        //             state.reps = {};
        //             state.rest = "";
        //         }
        //     );
        //
        //     console.log("=======================================");
        //     console.log(this.state.dayWorkout);
        //     // console.log(dayWorkout);
        //     console.log("=======================================");
        //
        //     if(e.target.name ==="next")
        //         this.setState({dayWorkout: temp2,index:this.state.index+1});
        //     else
        //         this.setState({dayWorkout: temp2,index:this.state.index-1});
        //     //sets all states to empty and increments the day tag
        // }
        // // day=>exercise no. ,
        // // dispatch to redux
        // update dates and clear all the states
    }

    onPrevious() {
        this.setState({index:this.state.index-1})
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

WorkoutGroup.propTypes ={
    addWorkoutToRedux:React.PropTypes.func.isRequired
};

const dayOfWeek = (i) => {
    if (i%7 < 0)
        return 7 + i%7;
    else
        return i%7;
};

export default connect(null,{addWorkoutToRedux})(WorkoutGroup);