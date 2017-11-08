import React from 'react'
import isEmpty from 'lodash/isEmpty'
import {scrollToError} from "../../../Toolbox/Helpers/extra";

/** Represents one rep box.
 */
class Reps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           rep:""
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
        this.props.handleReps(e.target.value,this.props.id);
    }

    render() {

        if(!isEmpty(this.props.reps[`set${this.props.id+1}`])){
            this.state.rep= this.props.reps[`set${this.props.id+1}`]
        }
        const {rep} = this.state;

        /** If reps array is empty, it senses that there is no need for 'reps' field on the UI anymore,
         * So it sets value as empty string which gets reflected on the UI
         */
        const value = isEmpty(this.props.reps) ?"":rep;

        return (
            <input
                key={this.props.id}
                type="number"
                name="rep"
                value={value}
                max={300}
                min={1}
                onChange={this.onChange}
                className="in-line form-control"
                placeholder={`set ${this.props.id+1}`}
            />
        );
    }
}

Reps.propTypes={
    id:React.PropTypes.number.isRequired,
    reps:React.PropTypes.object.isRequired,
    handleReps:React.PropTypes.func.isRequired,
};

export default Reps;