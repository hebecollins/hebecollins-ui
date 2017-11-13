import React from 'react'
import WorkoutGroup from "../../others/inputFieldGroup/WorkoutGroup";
import {
    getSavedWorkoutByLabel, addWorkoutToRedux, clearWorkoutFromRedux, updateSavedWorkoutOnServer
} from "../../../actions/workoutActions"
import {connect} from 'react-redux'
import SingleScreen2 from "../../others/frames/SingleScreen2";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {TextField} from "../../others/inputField/InputFieldWithIconAddOn";
import {validateLabel} from "../../../Toolbox/Validation/helpers";
import {scrollToError} from "../../../Toolbox/Helpers/extra";
import isEmpty from 'lodash/isEmpty'
import {redirectByName} from "../../../Toolbox/Helpers/redirect";
import {Loading} from "../../others/extra/Loading";

class EditSavedWorkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            label: this.props.selectedLabel.label,
            errors: '',
            hasServerResponded: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    componentWillMount() {
        const {selectedLabel, getSavedWorkoutByLabel} = this.props;
        if (isEmpty(selectedLabel)) {
            return redirectByName("SAVED_WORKOUT_LIST")
        }
        getSavedWorkoutByLabel(selectedLabel.labelId).then((res) => {
            this.setState({hasServerResponded: true});

        }).catch(err => {
            this.setState({hasServerResponded: true});
            errorResponse(err)
        })
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
        this.props.clearWorkoutFromRedux();
    }

    onSubmit() {
        if (this.isValid()) {
            this.setState({errors: {}});
            if (this.child.addedToStore()) {
                this.setState({isLoading: true});
                const self = this;

                //setTimeout holds the execution of below method for sometime so that redux updates can be reflected here
                setTimeout(() => {
                    const {label} = this.state;
                    const {updateSavedWorkoutOnServer, gymId, workout, selectedLabel} = self.props;
                    updateSavedWorkoutOnServer(workout, gymId, label, selectedLabel.labelId).catch(
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
        const {workout, addWorkoutToRedux, selectedLabel} = this.props;
        return (
            this.state.hasServerResponded ? <div className="content">
                <SingleScreen2>
                    <div className="white-center">
                        Tag : <label className="list-monitor-header">{selectedLabel.label}</label>

                    </div>
                    <div className="workout-schedule-label">
                        <label>Edit label:</label>
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
                            disabled={this.state.isLoading}>Update
                        </button>
                    </div>
                </SingleScreen2>

            </div> : <Loading/>
        )
    }
}

function mapStateToProps(state) {
    return {
        workout: state.workout.workout,
        gymId: state.selectedGym.gym_id,
        selectedLabel: state.selectedLabel
    }
}

const mapDispatchToProps = {
    addWorkoutToRedux,
    clearWorkoutFromRedux,
    updateSavedWorkoutOnServer,
    getSavedWorkoutByLabel
};


export default connect(mapStateToProps, mapDispatchToProps)(EditSavedWorkout)