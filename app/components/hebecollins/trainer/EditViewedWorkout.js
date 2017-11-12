import React from 'react'
import WorkoutGroup from "../../others/inputFieldGroup/WorkoutGroup";
import {addWorkoutToRedux, addAssignedWorkoutToServer, clearWorkoutFromRedux} from "../../../actions/workoutActions"
import {connect} from 'react-redux'
import SingleScreen2 from "../../others/frames/SingleScreen2";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {redirectByName} from "../../../Toolbox/Helpers/redirect";
import {scrollToError} from "../../../Toolbox/Helpers/extra";
import {getSelectedClientWorkoutToRedux} from "../../../actions/workoutActions"
import {Loading} from "../../others/extra/Loading"

class EditViewedWorkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            hasServerResponded:false
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        const {gymId, getSelectedClientWorkoutToRedux, selectedUser} = this.props;
        const clientId = selectedUser.user_id;
        getSelectedClientWorkoutToRedux(gymId, clientId).then((res) => {
            this.setState({hasServerResponded: true});

        }).catch(err => {
            this.setState({hasServerResponded: true});
            errorResponse(err)
        })
    }

    onSubmit() {
        //its an async action which scrolls to error blocks if there is any on the page
        scrollToError();
        const self = this;
        if (this.child.addedToStore()) {

            //setTimeout holds the execution of below method for sometime so that redux updates can be reflected here
            setTimeout(() => {
                const {addAssignedWorkoutToServer, selectedUser, gymId, workout} = self.props;
                const clientId = selectedUser.user_id;
                addAssignedWorkoutToServer(workout, gymId, clientId).catch(
                    err => {
                        errorResponse(err);
                        this.setState({isLoading: false});
                    }
                )
            }, 100)
        }
    };

    //delete workout from redux once component is unmounted
    componentWillUnmount() {
        this.props.clearWorkoutFromRedux();
    }

    render() {
        const {workout, selectedUser, addWorkoutToRedux} = this.props;
        return (
            this.state.hasServerResponded?
                <div className="content">
                <SingleScreen2>
                    <div className="white-center">
                        Editing Workout schedule for <label className="list-monitor-header">{selectedUser.nick_name}</label>
                    </div>
                    <WorkoutGroup
                        onRef={ref => (this.child = ref)}
                        addWorkoutToRedux={addWorkoutToRedux}
                        workout={workout}
                    />
                    <div className='pager'>
                        <button className="btn-hebecollins-orange" onClick={this.onSubmit}>
                            Assign this workout to {selectedUser.nick_name}
                        </button>
                    </div>
                </SingleScreen2>
            </div>:<Loading/>
        )
    }
}

const mapStateToProps=(state)=> ({
    workout: state.workout.workout,
    gymId: state.selectedGym.gym_id,
    selectedUser: state.selectedUser
});

const mapDispatchToProps = {
    addWorkoutToRedux,
    clearWorkoutFromRedux,
    addAssignedWorkoutToServer,
    getSelectedClientWorkoutToRedux
};

export default connect(mapStateToProps, mapDispatchToProps)(EditViewedWorkout)