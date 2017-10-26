import React from 'react'
import {Select2, TextField2} from "../inputField/InputFieldWithText";
import Reps from "./Reps";
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
            errors: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSetChange = this.onSetChange.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    /**Sets 'reps' as empty whenever there is a change in value of 'sets' so that there won't be any
     * unnecessary values staying in  'reps' boxes in the UI. And then calls onChange
     * */
    onSetChange(e){
        this.setState({reps:{}});
        this.onChange(e);
    }

    /**Updates reps object with set no. and no. of reps
     * */
    handleReps(value,id){
       this.state.reps[`set${id}`]= value;
     }

    render() {
        //appending to the day[] array
        this.props.day[this.props.id] = this.state;
        const {exercise_name, sets, reps,rest, errors} = this.state;

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
                <TextField2
                    field="sets"
                    value={sets}
                    label="Sets"
                    type="number"
                    error={errors.sets}
                    onChange={this.onSetChange}
                />

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
            </div>
        )
    }
}

Workout.propTypes={
    id:React.PropTypes.number.isRequired,
    day:React.PropTypes.array.isRequired,
};

export default Workout;