import React from 'react'
import {connect} from 'react-redux'
import {getSavedWorkoutByLabel, getSavedWorkoutList} from "../../../actions/workoutActions";
import {ButtonOrange} from "../../others/display/Buttons";
import SingleScreen2 from "../../others/frames/SingleScreen2";
import {Loading} from "../../others/extra/Loading";
import isEmpty from 'lodash/isEmpty'
import {redirectByName} from "../../../Toolbox/Helpers/redirect";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";

class SavedWorkoutList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workoutList: [],
            hasServerResponded:false
        };

        this.onUse = this.onUse.bind(this);
        this.onView = this.onView.bind(this);
    }


    componentWillMount() {
        getSavedWorkoutList(this.props.gymId).then(
            (res) => {
                const labels = res.data.labels;
                if(isEmpty(labels)){
                    redirectByName("NO_RECORDS_FOUND")
                }else{
                    this.setState({workoutList: labels,hasServerResponded:true});
                }
            }
        )
    }

    /** gets workout from the server with same labelId, stores it in redux and then redirects
     * to assignWorkout page
     * @param labelId => Id corresponding to selected label
     */
    onUse(labelId){
        const {getSavedWorkoutByLabel,gymId} = this.props;
        getSavedWorkoutByLabel(gymId,labelId).then(
            (res)=>{
                redirectByName("ASSIGN_WORKOUT")
            }
        ).catch(err => errorResponse(err))
    }

    onView(id){
        redirectByName("VIEW_WORKOUT")
    }

    render() {
        const {workoutList} = this.state;

        const labelList = workoutList.map((label) => {
                return (
                    <div key={label.id}>
                        <div className="list-individual-info">
                            <label className="field">Name :</label>
                            <label className="value">{label.label}</label><br/>
                            <label className="field">Created On :</label>
                            <label className="value">{label.created_at}</label><br/>
                        </div>
                        <div className="pull-right">
                            <ButtonOrange
                                onClick={()=>this.onUse(label.id)}
                                label={"use"}/>
                            <ButtonOrange
                                onClick={()=>this.onView(label.id)}
                                label={"view"}/>
                        </div>
                    </div>
                );
            }
        );

        return this.state.hasServerResponded?
            <div className="content">
                <SingleScreen2>
                    <h1 className="white-center">Saved Workout List</h1>
                    {labelList}
                </SingleScreen2>
            </div>:
            <Loading/>

    }
}

function mapStateToProps(state) {
    return {
        selectedUser: state.selectedUser,
        gymId: state.selectedGym.gym_id,
    }
}

export default connect(mapStateToProps,{getSavedWorkoutByLabel})(SavedWorkoutList)