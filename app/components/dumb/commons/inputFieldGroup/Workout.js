import React from 'react'
import {Select2, TextField2} from "../inputField/InputFieldWithText";
import Reps from "./Reps";
import {validateExercise} from "../../../../Toolbox/Validation/helpers";
import classnames from 'classnames'

//represents one exercise form
class Workout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exercise_name: "",
            sets: "",
            reps:{},
            rest: "",
            errors: "",
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSetChange = this.onSetChange.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    onSetChange(e){
        this.setState({reps:{}});
        //to avoid being taking the older state, in case of number of input changes
        this.onChange(e);
    }

    /**Updates reps object with set no. and no. of reps
     * */
    handleReps(value,id){
       this.state.reps[`set${id}`]= value;
        console.log(this.state.reps);
     }

    isValid() {
        const {errors, isValid} = validateExercise(this.state);
        if (!isValid) {
            console.log(errors);
            this.setState({errors});
        }
        return isValid;
    }

    onSubmit(){
        if(!this.isValid()){
            console.log(this.state);
        }
     }

    render() {
        //appending to the day[] array
        //mutable copy
        this.props.day[this.props.id] = this.state;
        const {exercise_name, sets, reps,rest, comment, errors, isLoading} = this.state;
        const handleSets = (sets) => {
            let a = [];
            for (let i = 1; i <= sets; i++) {
                a.push(
                    <Reps key={i} id={i} reps={reps} handleReps={this.handleReps.bind(this)}/>
                );
            }
            return <div>{sets ? (
                <div className="input-group">
                <span className="input-group-addon">
                    Reps
                </span>
                    <div className="no-margin pager">
                        {a}
                    </div>
                </div>
            ) : <div> </div>}</div>;
        };

        return (
            <div>
                <TextField2
                    field="exercise_name"
                    value={exercise_name}
                    label="Exercise Name"
                    error={errors.exercise_name}
                    onChange={this.onChange}
                />
                <Select2
                    value={sets}
                    onChange={this.onSetChange}
                    field="sets"
                    label="Sets"
                    error={errors.sets}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                </Select2>

                <div className={classnames('form-group', {'has-error': errors.reps})}>
                    {handleSets(sets)}
                    {errors.reps && <span className="help-block">{errors.reps}</span>}
                </div>

                <TextField2
                    field="rest"
                    value={rest}
                    label="Rest (in sec)"
                    type="number"
                    error={errors.rest}
                    onChange={this.onChange}
                />
                <button className="btn-hebecollins-black" onClick={this.onSubmit.bind(this)}>Submit</button>
            </div>
        )
    }
}

Workout.propTypes={
    id:React.PropTypes.number.isRequired,
    day:React.PropTypes.array.isRequired,
    update: React.PropTypes.func.isRequired,
};

export default Workout;