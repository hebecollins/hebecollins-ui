import React from 'react'
import SingleScreen from "../../dumb/commons/templates/SingleScreen";
import {Select, TextField} from "../../dumb/commons/inputField/InputFieldWithIcon";
import {Select2, TextField2} from "../../dumb/commons/inputField/InputFieldWithText";

class AddWorkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exercise_name: "",
            sets: "",
            rest: "",
            comment: "",
            error: "",
            isLoading: ""
        };

        this.onChange = this.onChange.bind(this);

    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value});
    }

    render() {
        const {exercise_name, sets, rest, comment, error, isLoading} = this.state
        return (
            <div className="content">
                <SingleScreen>
                    <div className="white-center">Enter the workout</div>

                    <TextField2
                        field="exercise_name"
                        value={exercise_name}
                        label="Exercise Name"
                        onChange={this.onChange}
                    />

                    <Select2
                        value={sets}
                        onChange={this.onChange}
                        field="rest"
                        label="Sets"
                        error={error}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                    </Select2>

                    <TextField2
                        field="rest"
                        value={rest}
                        label="Rest (in sec)"
                        onChange={this.onChange}
                    />

                    <div className="input-group">
                <span className="input-group-addon">
                    something
                </span>
                    <div className="no-margin pager">
                            <input type="number" max={100} min={1} className="in-line form-control"  placeholder="1"/>
                            <input type="number" max={100} min={1} className="in-line form-control"  placeholder="1"/>
                            <input type="number" max={100} min={1} className="in-line form-control"  placeholder="1"/>
                            <input type="number" max={100} min={1} className="in-line form-control"  placeholder="1"/>
                            <input type="number" max={100} min={1} className="in-line form-control"  placeholder="1"/>
                    </div></div>

                </SingleScreen>
            </div>



        )
    }
}

export default AddWorkout