import React from 'react'
import {connect} from 'react-redux'
import {
    deleteSavedWorkoutFromServer, getSavedWorkoutByLabel,
    getSavedWorkoutList
} from "../../../actions/workoutActions";
import {ButtonOrange} from "../../others/display/Buttons";
import SingleScreen2 from "../../others/frames/SingleScreen2";
import {Loading} from "../../others/extra/Loading";
import isEmpty from 'lodash/isEmpty'
import {redirectByName} from "../../../Toolbox/Helpers/redirect";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {addFlashMessage, saveSelectedLabel, saveSelectedUser} from "../../../actions/actionStore";
import {deepCloneArray, deepCloneObject} from "../../../Toolbox/Helpers/extra";
import {Fade, Slide} from "../../others/extra/Animation";

class SavedWorkoutList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workoutList: [],
            hasServerResponded: false
        };

        this.onUse = this.onUse.bind(this);
        this.onView = this.onView.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }


    componentWillMount() {
        getSavedWorkoutList(this.props.gymId).then(
            (res) => {
                const labels = res.data.labels;
                if (isEmpty(labels)) {
                    redirectByName("NO_RECORDS_FOUND")
                } else {
                    this.setState({workoutList: labels, hasServerResponded: true});
                }
            }
        )
    }

    /** gets workout from the server with same labelId, stores it in redux and then redirects
     * to assignWorkout page
     * @param labelId => Id corresponding to selected label
     */
    onUse(labelId) {
        const {getSavedWorkoutByLabel} = this.props;
        getSavedWorkoutByLabel(labelId).then(
            (res) => {
                redirectByName("ASSIGN_WORKOUT")
            }
        ).catch(err => errorResponse(err))
    }

    onView(labelId, label) {
        this.props.saveSelectedLabel(labelId,label);
        redirectByName("VIEW_SAVED_WORKOUT")
    }

    onDelete(labelId, index) {
        deleteSavedWorkoutFromServer(labelId).then(res => {
            let tempList = deepCloneArray(this.state.workoutList);
            tempList.splice(index, 1);
            console.log(tempList);
            this.setState({workoutList: tempList});
        })
    }

    render() {
        const {workoutList} = this.state;

        const labelList = workoutList.map((label, index) => {
                return (
                    <div key={label.id} className="list-element">
                        <div className="list-individual-info">
                            <label className="field">Name :</label>
                            <label className="value">{label.label}</label><br/>
                            <label className="field">Created On :</label>
                            <label className="value">{label.created_at}</label><br/>
                        </div>
                        <div className="pull-right">
                            <ButtonOrange
                                onClick={() => this.onUse(label.id)}
                                label={"Use"}/>
                            <ButtonOrange
                                onClick={() => this.onView(label.id, label.label)}
                                label={"View"}/>
                            <ButtonOrange
                                onClick={() => this.onDelete(label.id, index)}
                                label={"Delete"}/>
                        </div>
                    </div>
                );
            }
        );

        return this.state.hasServerResponded ?
            <div className="content">
                <SingleScreen2>
                    <a onClick={() => redirectByName("CREATE_WORKOUT")} className="edit-icon-link pull-right">
                        <span className="glyphicon glyphicon-plus"/> Add New
                    </a>
                    <h1 className="white-center">Saved Workout List</h1>

                    <Fade>{labelList}</Fade>
                </SingleScreen2>
            </div> :
            <Loading/>

    }
}

function mapStateToProps(state) {
    return {
        selectedUser: state.selectedUser,
        gymId: state.selectedGym.gym_id
    }
}

export default connect(mapStateToProps, {getSavedWorkoutByLabel,saveSelectedLabel})(SavedWorkoutList)