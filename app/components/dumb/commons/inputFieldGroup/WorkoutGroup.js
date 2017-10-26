import React from 'react'
import Workout from "../../../dumb/commons/inputFieldGroup/Workout";

//represents one day's workout
class WorkoutGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises:[{
                exercise_name:"",
                sets:"",
                reps:"",
                rest:""
            }],
            isLoading: "",
            isSubmit: false,
            exercise_count: 1,
            key: '',
            day: []
        };

        this.onUpdate = this.onUpdate.bind(this);
        this.incrementCount = this.incrementCount.bind(this);

    }

    incrementCount() {
        this.setState({exercise_count: this.state.exercise_count + 1})
    }

    onUpdate() {
        console.log(this.state.day);
        // this.props.week[this.props.dayOfWeek] = this.state.day
    }

    onNext(){
        this.setState({isSubmit:true});
        console.log(this.state.day);

        //call for validation for states that belongs to workout component
        //day=>exercise no. ,
        //dispatch to redux
        //update dates and clear all the states
    }

    render() {
        const {exercise_count} = this.state;
        const getExerciseForm = () => {
            let exerciseForm = [];
            for (let i = 0; i < exercise_count; i++) {
                exerciseForm.push(<div key={i}><span className="badge">{i+1}</span>
                    <Workout
                        day={this.state.day}
                        id={i} update={this.onUpdate}
                        key={i}
                        isSubmit={this.state.isSubmit}
                    /></div>)
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
                    <button onClick={this.onPrevious}
                            className="btn-hebecollins-black">PREVIOUS
                    </button>
                    <button onClick={this.onNext.bind(this)}
                            className="btn-hebecollins-black">NEXT
                    </button>
                </div>
            </div>
        )
    }
}

// WorkoutGroup.propTypes ={
//     dayOfWeek:React.PropTypes.string.isRequired,
//     week:React.PropTypes.array.isRequired
// };

export default WorkoutGroup;