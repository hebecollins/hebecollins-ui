import React from 'react'
import {Select2, TextField2} from "../inputField/InputFieldWithText";
import Reps from "./Reps";

class Workout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exercise_name: "",
            sets: 0,
            reps:{},
            rest: "",
            comment: "",
            error: "",
            isLoading: "",
            exercise_count: 2
        };

        this.onChange = this.onChange.bind(this);
        this.incrementCount = this.incrementCount.bind(this);
        this.onSetChange = this.onSetChange.bind(this);

    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
        this.props.day[this.props.id] = this.state;
        this.props.update();
    }

    incrementCount() {
        this.setState({exercise_count: this.state.exercise_count + 1})
    }

    onSetChange(e){

        this.setState({reps:{}});//to avoid being taking the older state, in case of number
                                 //of input changes
        this.onChange(e);
    }


    render() {
        const {exercise_name, sets, reps,rest, comment, error, isLoading} = this.state;
        const handleSets = (sets) => {
            let a = [];
            for (let i = 1; i <= sets; i++) {
                a.push(
                    <Reps key={i} id={i} reps={reps}/>
                );
            }
            return <div>{sets ? (
                <div className="input-group">
                <span className="input-group-addon">
                    Reps
                </span>
                    <div className="no-margin pager">
                        {a}</div>
                </div>
            ) : <div></div>}</div>;
        };

        return (
            <div>
                <TextField2
                    field="exercise_name"
                    value={exercise_name}
                    label="Exercise Name"
                    onChange={this.onChange}
                />
                <Select2
                    value={sets}
                    onChange={this.onSetChange}
                    field="sets"
                    label="Sets"
                    error={error}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                </Select2>
                {handleSets(sets)}
                <TextField2
                    field="rest"
                    value={rest}
                    label="Rest (in sec)"
                    type="number"
                    onChange={this.onChange}
                />
            </div>
        )
    }
};

Workout.propTypes={
    id:React.PropTypes.number.isRequired,
    day:React.PropTypes.array.isRequired,
    update: React.PropTypes.func.isRequired,
};

export default Workout;