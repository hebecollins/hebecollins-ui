import React from 'react'
import WorkoutGroup from "../../others/inputFieldGroup/WorkoutGroup";
import {addWorkoutToRedux, addCreatedWorkoutToServer} from "../../../actions/workoutActions"
import {clearWorkout} from "../../../actions/actionStore";
import {connect} from 'react-redux'
import SingleScreen2 from "../../others/frames/SingleScreen2";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {TextField} from "../../others/inputField/InputFieldWithIconAddOn";
import {validateLabel} from "../../../Toolbox/Validation/helpers";
import {scrollToError} from "../../../Toolbox/Helpers/extra";

class CreateWorkoutSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            label: '',
            errors: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    isValid() {
        const {errors, isValid} = validateLabel(this.state);
        if (!isValid) {
            this.setState({errors});
            scrollToError();
        }
        return isValid;
    }

    //to clear workout as soon as component is unmounted
    componentWillUnmount() {
        this.props.clearWorkout();
    }

    onSubmit() {
        if (this.isValid()) {
            this.setState({errors: {}});
            if (this.child.addedToStore()) {
                this.setState({isLoading: true});
                const self = this;

                //setTimeout holds the execution of below method for sometime so that redux updates can be reflected here
                setTimeout(() => {
                    const {addCreatedWorkoutToServer, gymId, workout} = self.props;
                    addCreatedWorkoutToServer(workout, gymId, this.state.label).catch(
                        err => {
                            errorResponse(err);
                            const response = errorResponse(err);
                            if (response !== null) {
                                this.setState({errors: response, isLoading: false})
                            }
                        }
                    )
                }, 100)
            }
        }
    };

    render() {
        const {workout, addWorkoutToRedux} = this.props;
        return (
            <div className="content">
                <SingleScreen2>
                    <div className="white-center">
                        Create A Workout Schedule
                    </div>
                    <div className="workout-schedule-label">
                        <label>Put a label on your workout:</label>
                        <TextField
                            field="label"
                            value={this.state.label}
                            label="Name for your workout"
                            error={this.state.errors.label}
                            isIconNeeded={false}
                            onChange={this.onChange}/>
                    </div>
                    <WorkoutGroup
                        onRef={ref => (this.child = ref)}
                        addWorkoutToRedux={addWorkoutToRedux}
                        workout={workout}
                    />
                    <div className='pager'>
                        <button
                            className="btn-hebecollins-orange"
                            onClick={this.onSubmit}
                            disabled={this.state.isLoading}>Submit
                        </button>
                    </div>
                </SingleScreen2>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        workout: state.workout.workout,
        gymId: state.selectedGym.gym_id,
    }
}

const mapDispatchToProps = {
    addWorkoutToRedux,
    clearWorkout,
    addCreatedWorkoutToServer
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateWorkoutSchedule)