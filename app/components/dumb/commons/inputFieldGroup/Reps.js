import React from 'react'
import isEmpty from 'lodash/isEmpty'

//represents one rep box
class Reps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           reps:0
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
        this.props.handleReps(e.target.value,this.props.id);
    }

    render() {
        const {rep} = this.state;
        return (
            <div>{ isEmpty(this.props.reps)?
            <input
                key={this.props.id}
                type="number"
                name="rep"
                value={""}
                max={300} min={1}
                onChange={this.onChange}
                className="in-line form-control"
                placeholder={`set ${this.props.id}`}
            />:
                <input
                    key={this.props.id}
                    type="number"
                    name="rep"
                    value={rep}
                    max={300} min={1}
                    onChange={this.onChange}
                    className="in-line form-control"
                    placeholder={`set ${this.props.id}`}
                />

            }</div>

        );
    }
}

Reps.propTypes={
    id:React.PropTypes.number.isRequired,
    reps:React.PropTypes.object.isRequired,
    handleReps:React.PropTypes.func.isRequired,
};

export default Reps;