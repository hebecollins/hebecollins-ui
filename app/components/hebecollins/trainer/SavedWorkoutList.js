import React from 'react'
import {connect} from 'react-redux'
import {getSavedWorkoutByLabel, getSavedWorkoutList} from "../../../actions/workoutActions";
import {ButtonOrange} from "../../others/display/Buttons";
import SingleScreen2 from "../../others/frames/SingleScreen2";
import {Loading} from "../../others/extra/Loading";
import isEmpty from 'lodash/isEmpty'

class SavedWorkoutList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workoutList: []
        };

        this.onUse = this.onUse.bind(this);
        this.onView = this.onView.bind(this);
    }


    componentWillMount() {
        getSavedWorkoutList(this.props.gymId).then(
            (res) => {
                const labels = res.data.labels;
                this.setState({workoutList: labels});
            }
        )
    }

    onUse(labelId){
        const {getSavedWorkoutByLabel,gymId} = this.props;
        getSavedWorkoutByLabel(gymId,labelId).then(
            (res)=>{
                // const workout = res.data
                // console.log(res.data)
            }
        )
    }

    onView(id){

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

        return !isEmpty(this.state.workoutList)?
            <div className="content">
                <SingleScreen2>
                    <h1 className="white-center">Saved Workout List</h1>
                    {labelList}
                </SingleScreen2>
            </div>:<Loading/>

    }
}

function mapStateToProps(state) {
    return {
        selectedUser: state.selectedUser,
        gymId: state.selectedGym.gym_id,
    }
}

export default connect(mapStateToProps,{getSavedWorkoutByLabel})(SavedWorkoutList)