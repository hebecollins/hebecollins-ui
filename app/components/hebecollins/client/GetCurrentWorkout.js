import React from 'react'
import {getCurrentWorkout} from "../../../actions/workoutActions";
import {connect} from 'react-redux'

class GetCurrentWorkout extends React.Component{
    constructor(props){
        super(props)
    }

    componentWillMount(){
        const {gymId}= this.props;
       getCurrentWorkout(gymId)
    }

    render(){
        return(
            <div className="content">
                <p className="white-center">helllo</p>
            </div>
        )

    }
}

function mapStateToProps(state){
    return {
        gymId:state.selectedGym.gym_id,
    }
}

export default connect(mapStateToProps)(GetCurrentWorkout);