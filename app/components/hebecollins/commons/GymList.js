import React from 'react'
import {getGymListInTheArea} from "../../../actions/gymActions";
import Rate from "../../others/extra/Rate";
import {ButtonOrange} from "../../others/display/Buttons";
import {connect} from "react-redux"
import {setDefaultGym} from "../../../actions/authActions";
import {redirectByName} from "../../../Toolbox/Helpers/redirect";

class GymList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gyms: [],
            isLoading: false
        }
    }

    componentWillMount() {
        getGymListInTheArea().then(res => {
            this.setState({gyms: res.data.gyms})
        })
    }

    viewReviews(id,name, locality) {
        this.setState({isLoading:true});
        const gym = {
            'gym_id':id,
            'gym_name':name,
            'locality':locality
        };
        this.props.setDefaultGym(gym);
        redirectByName('GYM_PROFILE_IN_VIEW_MODE');
    }


    render() {
        const gymList = this.state.gyms.map((gym, index) => {
            return (
                <div key={index} className="exercise-control">
                    <div className="exercise-details">
                        <div className="flex">
                            <div className="list-logo-container">
                                <img className="list-logo" src={gym.logo}/>
                            </div>
                            <div className="list-detail">
                                <div className="orange-header">
                                    {gym.gym_name}, {gym.locality}, {gym.district}
                                </div>
                                <div className="list-rating flex">
                                    <Rate value={gym.avg_rating} isSelectable={false} isAggregateRating={true}/>
                                    <div className="field">{`(${gym.reviewer_count} reviews)`}</div>
                                </div>
                                <ButtonOrange
                                    onClick={() => this.viewReviews(gym.gym_id, gym.gym_name, gym.locality)}
                                    disabled={this.state.isLoading}
                                    label={"View Full Reviews"}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });

        return <div className="content">
            <div className="workout-group">
                {gymList}
            </div>
        </div>
    }
}


export default connect(null,{setDefaultGym})(GymList);