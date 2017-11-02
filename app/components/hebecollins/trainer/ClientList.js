import React from 'react'
import {clientListForTrainer} from "../../../actions/userListActions"
import {connect} from "react-redux"
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler"
import isEmpty from 'lodash/isEmpty'
import {ListElement} from "../../others/frames/ListElement"
import Scrollable from "../../others/extra/Scrollable";
import {deepCloneArray, getFormattedDate} from "../../../Toolbox/Helpers/extra";
import {Fade, Slide} from "../../others/extra/Animation";
import {redirectByName} from "../../../Toolbox/Helpers/redirect";

class ClientList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            index: 0,
            isClicked: [true]
        }
        this.addWorkout=this.addWorkout.bind(this);
        this.viewProfile=this.viewProfile.bind(this);
        this.viewWorkout=this.viewWorkout.bind(this);
    }

    componentWillMount() {
        const {user} = this.props;
        const gymId = user.gym_list[0].gym_id;
        clientListForTrainer(gymId).then(
            (res) => {
                this.setState({
                    clients: res.data.clients,
                });
            }
        ).catch(err => {
                errorResponse(err)
            }
        )
    }

    onClick(index) {
        const isClicked = [];
        isClicked[index] = true;
        this.setState({index: index, isClicked: deepCloneArray(isClicked)})
    }

    addWorkout(clientId){
        console.log("adding workout");
        console.log(clientId);
        redirectByName("ADD_WORKOUT");
    }

    viewWorkout(){

    }

    viewProfile(){

    }

    render() {
        const {clients, index, isClicked} = this.state;
        console.log(clients);
        return (
            <div className="content">
                <div className="row">
                    <div className="col col-lg-5 col-md-5 col-sm-5 col-xs-12 round-edged-box">
                        <p className="list-header">Client List</p>
                        <Scrollable>
                            {!isEmpty(clients)
                                ?
                                clients.map((client, key) =>
                                    <div key={key}>
                                        <ListElement
                                            index={key}
                                            isClicked={isClicked}
                                            nick_name={client.nick_name}
                                            first_name={client.first_name}
                                            middle_name={client.middle_name}
                                            last_name={client.last_name}
                                            img_thumb={client.img_thumb}
                                            joining_date={client.joining_date}
                                            workout_update_date={client.workout_update_date}
                                            onClick={this.onClick.bind(this)}
                                        />
                                        <div>
                                            <Fade>
                                                {isClicked[key] ?
                                                    <div className="list-dropdown-mobile-visible">
                                                        <button className="btn-hebecollins-orange">Add Workout</button>
                                                        <button className="btn-hebecollins-orange">View Workout</button>
                                                        <button className="btn-hebecollins-orange">View Full Profile
                                                        </button>
                                                    </div> :
                                                    <div/>
                                                }
                                            </Fade>
                                        </div>
                                    </div>
                                )
                                : <p/>
                            }
                        </Scrollable>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-7 hidden-xs round-edged-box">
                        {!isEmpty(clients)
                            ?
                            <div>
                                <p className="list-monitor-header">
                                    {clients[index].first_name + " " + clients[index].middle_name
                                    + " " + clients[index].last_name}
                                    {` (${clients[index].nick_name})`}
                                </p>
                                <div className="list-monitor-elements">
                                    <p>
                                        Age : {` ${clients[index].age} years`}
                                    </p>
                                    <p>
                                        Joining date : {` ${getFormattedDate(clients[index].joining_date)}`}
                                    </p>
                                    <p>
                                        Workout updated on : {clients[index].workout_update_date ?
                                        ` ${getFormattedDate(clients[index].workout_update_date)}` : "not assigned"
                                    }
                                    </p>
                                    <p>
                                        Goal: {clients[index].primary_goal ?
                                        ` ${clients[index].primary_goal}` : "not entered"
                                    }
                                    </p>

                                    <p>
                                        Remarks: {clients[index].remarks ?
                                        ` ${clients[index].remarks}` : "not entered"
                                    }
                                    </p>
                                </div>
                                <button className="btn-hebecollins-orange"
                                        onClick={()=>this.addWorkout(clients[index].client_id)}>Add Workout</button>
                                <button className="btn-hebecollins-orange"
                                        onClick={()=>this.viewWorkout(clients[index].client_id)}>View Workout</button>
                                <button className="btn-hebecollins-orange"
                                        onClick={()=>this.viewProfile(clients[index].client_id)}>View Full Profile</button>
                            </div>
                            : <p/>
                        }
                    </div>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(ClientList);