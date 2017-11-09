import React from 'react'
import {TextField2} from "../inputField/InputFieldWithTextAddOn";
import Reps from "./Reps";
import classnames from 'classnames'
import {deepCloneObject, scrollToError} from "../../../Toolbox/Helpers/extra";
import isEmpty from 'lodash/isEmpty'
import {TextField} from "../inputField/InputFieldWithIconAddOn";
import Autosuggestion from "../extra/Autosuggestion";

/** Represents one workout form.
 *  Working: It need two props to work i.e 'dataToBeDisplayed' and 'dataToBeStored'.
 *          When localMode is true, it uses its own state to populate input fields and gives that data to 'dataToBeStored'
 *          When localMode is false, it checks for 'dataToBeDisplayed' and populates its states with the data in it.
 */

class Workout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exercise_name: "",
            sets: "",
            reps: {},
            rest: "",
            errors: "",
        };
        this.onChange = this.onChange.bind(this);
        this.onSetChange = this.onSetChange.bind(this);
        this.onExerciseChange= this.onExerciseChange.bind(this);
    }

    onChange(e) {
        this.props.dataToBeDisplayed[this.props.id] = {};
        this.setState({[e.target.name]: e.target.value});
    }

    onExerciseChange(e, {newValue}){
        this.props.dataToBeDisplayed[this.props.id] = {};
        this.setState({
            exercise_name: newValue
        });
    }

    /**Sets 'reps' as empty whenever there is a change in value of 'sets' so that there won't be any
     * unnecessary values staying in  'reps' boxes in the UI. And then calls onChange
     * */
    onSetChange(e) {
        this.setState({reps: {}});
        this.onChange(e);
    }


    /**Updates reps object with set no. and no. of reps
     * */
    handleReps(value, id) {
        this.props.dataToBeDisplayed[this.props.id] = {};
        let temp = deepCloneObject(this.state.reps);
        temp[`set${id + 1}`] = value;
        this.setState({reps: temp})
    }

    render() {
        const {dataToBeStored, dataToBeDisplayed, id, exerciseSuggestionList} = this.props;

        if (!isEmpty(dataToBeDisplayed[id])) {
            //sending data
            this.state = deepCloneObject(dataToBeDisplayed[id])
        }

        dataToBeStored[id] = deepCloneObject(this.state);

        const {exercise_name, sets, reps, rest, errors} = this.state;


        const handleSets = (sets) => {
            let a = [];
            for (let i = 0; i < sets; i++) {
                a.push(
                    <Reps key={i} id={i}
                          reps={reps}
                          handleReps={this.handleReps.bind(this)}
                    />
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
            ) : <div/>}</div>;
        };

        return (
                <div>


                    <div className={classnames('form-group', {'has-error': errors.exercise_name})}>
                        <Autosuggestion
                            suggestionList={exerciseSuggestionList}
                            label="Exercise Name"
                            onChange={this.onExerciseChange}
                            value={exercise_name}
                        />
                        {errors.exercise_name && <span className="help-block">{errors.exercise_name}</span>}
                    </div>

                    <TextField
                        field="sets"
                        value={sets}
                        label="Sets"
                        type="number"
                        isIconNeeded={false}
                        error={errors.sets}
                        onChange={this.onSetChange}
                    />

                    <div className={classnames('form-group', {'has-error': errors.reps})}>
                        {handleSets(sets)}
                        {errors.reps && <span className="help-block">{errors.reps}</span>}
                    </div>

                    <TextField
                        field="rest"
                        value={rest}
                        label="Rest (in sec)"
                        isIconNeeded={false}
                        type="number"
                        error={errors.rest}
                        onChange={this.onChange}
                    />
                </div>
        )
    }
}

Workout.propTypes = {
    id: React.PropTypes.number.isRequired,
    dataToBeStored: React.PropTypes.array.isRequired,
    dataToBeDisplayed: React.PropTypes.array.isRequired,
    exerciseSuggestionList:React.PropTypes.array.isRequired
};



export default Workout;