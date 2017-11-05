import React from 'react'
import SingleScreen from "../../others/frames/SingleScreen";
import WorkoutGroup from "../../others/inputFieldGroup/WorkoutGroup";
import {addWorkoutToRedux, addCreatedWorkoutToServer} from "../../../actions/workoutActions"
import {connect} from 'react-redux'
import SingleScreen2 from "../../others/frames/SingleScreen2";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {TextField} from "../../others/inputField/InputFieldWithIconAddOn";
import {TextField2} from "../../others/inputField/InputFieldWithTextAddOn";

class CreateWorkoutSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            label:""
        };
        this.onSubmit= this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit() {
        this.setState({isLoading:true});
        const {addCreatedWorkoutToServer, gymId, workout} = this.props;
        if(this.child.addedToStore()){
            addCreatedWorkoutToServer(workout, gymId, this.state.label).catch(
                err => {
                    errorResponse(err);
                    this.setState({isLoading:false});
                }
            );
        }
    };

    render() {
        const { workout, addWorkoutToRedux } = this.props;
        return (
            <div className="content">
                <SingleScreen2>
                    <div className="white-center">
                        Create A Workout Schedule
                    </div>
                    <TextField
                        field="workoutName"
                        value={this.state.label}
                        label="Name for your workout"
                        isIconNeeded={false}
                        onChange={this.onChange}/>
                    <WorkoutGroup
                        onRef={ref => (this.child = ref)}
                        addWorkoutToRedux={addWorkoutToRedux}
                        workout={workout}
                    />
                    <div className='pager'>
                        <button
                            className="btn-hebecollins-orange"
                            onClick={this.onSubmit}
                            disabled={this.state.isLoading}>Submit</button>
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

export default connect(mapStateToProps, {addWorkoutToRedux, addCreatedWorkoutToServer})(CreateWorkoutSchedule)