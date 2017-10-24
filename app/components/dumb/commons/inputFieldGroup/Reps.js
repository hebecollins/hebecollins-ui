import React from 'react'

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
        this.props.reps[`set ${this.props.id}`] = e.target.value;
    }

    render() {
        const {rep} = this.state;
        return (
            <input
                key={this.props.id}
                type="number"
                name="rep"
                value={rep}
                max={300} min={1}
                onChange={this.onChange}
                className="in-line form-control"
                placeholder={`set ${this.props.id}`}/>
        );
    }
}

Reps.propTypes={
    id:React.PropTypes.number.isRequired,
    reps:React.PropTypes.object.isRequired,
};

export default Reps;