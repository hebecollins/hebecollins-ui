import React from 'react'
import {getSavedWorkoutByLabel, getSelectedClientWorkoutToRedux} from "../../../actions/workoutActions";
import {connect} from 'react-redux'
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {Loading} from "../../others/extra/Loading"
import DisplayWorkout from "../../others/display/DisplayWorkout";
import {clearWorkout} from "../../../actions/actionStore";
import {redirectByName} from "../../../Toolbox/Helpers/redirect";
import isEmpty from 'lodash/isEmpty'

class ViewSavedWorkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            hasServerResponded: false,
        };
    }

    componentWillMount() {
        const {selectedLabel, getSavedWorkoutByLabel} = this.props;
        if(isEmpty(selectedLabel)){
         return redirectByName("SAVED_WORKOUT_LIST")
        }
        getSavedWorkoutByLabel(selectedLabel.labelId).then((res) => {
            this.setState({hasServerResponded: true});

        }).catch(err => {
            this.setState({hasServerResponded: true});
            errorResponse(err)
        })
    }

    //delete workout from redux once component is unmounted
    componentWillUnmount() {
        this.props.clearWorkout();
    }

    render() {
        const {gymId, workout, selectedLabel} = this.props;
        return (
            this.state.hasServerResponded ?
                <div className="quote-box content">
                <div className="horizontal-padding">
                    <h1 className="white-center">
                        Tag : <label className="list-monitor-header">{selectedLabel.label}</label>
                    </h1>

                    <a onClick={() => redirectByName("EDIT_SAVED_WORKOUT")} className="top-right edit-icon-link">
                        <h3><span className="glyphicon glyphicon-edit">edit</span></h3>
                    </a>

                    <DisplayWorkout gymId={gymId} workout={workout} index={this.state.index}/>
                </div></div> : <Loading/>
        )
    }
}

const mapStateToProps = (state) => ({
    gymId: state.selectedGym.gym_id,
    selectedLabel: state.selectedLabel,
    workout: state.workout.workout
});

const mapDispatchToProps = {
    getSelectedClientWorkoutToRedux,
    clearWorkout,
    getSavedWorkoutByLabel
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSavedWorkout);