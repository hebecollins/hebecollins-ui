import React from 'react'
import Workout from "../../../dumb/commons/inputFieldGroup/Workout";

//represents one day's workout
class WorkoutGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: "",
            exercise_count:1,
            day:[]
        };

        this.onUpdate = this.onUpdate.bind(this);
        this.incrementCount= this.incrementCount.bind(this);

    }

    incrementCount() {
        this.setState({exercise_count:this.state.exercise_count+1})
    }

    onUpdate(){
        console.log(this.state.day);
        // this.props.week[this.props.dayOfWeek] = this.state.day
    }

    render() {
        const {exercise_count} = this.state;
        const getExerciseForm=()=>{
            let exerciseForm =[];
            for(let i = 1; i<= exercise_count; i++){
                exerciseForm.push(<div key={i}><span className="badge">{i}</span>
                    <Workout day={this.state.day} id={i} update={this.onUpdate}/></div>)
            }
            return exerciseForm;
        };

        return (
            <div>
                    <div className="white-center">Enter the workout schedule</div>
                    {getExerciseForm()}

                    <div className='pager'>
                    <button onClick={this.incrementCount} className="btn-hebecollins-black">
                        Add More</button>
                    </div>
            </div>
        )
    }
}

WorkoutGroup.propTypes ={
    dayOfWeek:React.PropTypes.string.isRequired,
    week:React.PropTypes.array.isRequired
};

export default WorkoutGroup;