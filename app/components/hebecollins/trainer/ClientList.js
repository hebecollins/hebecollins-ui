import React from 'react'
import {clientListForTrainer} from "../../../actions/userListActions"
import {connect} from "react-redux"
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler"
import isEmpty from 'lodash/isEmpty'
import {ListElement} from "../../others/frames/ListElement"
import Scrollable from "../../others/extra/Scrollable";
import {deepCloneArray, getFormattedDate, getGenderFromGenderCode} from "../../../Toolbox/Helpers/extra";
import {Fade, Slide} from "../../others/extra/Animation";
import {redirectByName} from "../../../Toolbox/Helpers/redirect";

class ClientList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            index: 0,
            isClicked: [true]
        };
        this.addWorkout = this.addWorkout.bind(this);
        this.viewProfile = this.viewProfile.bind(this);
        this.viewWorkout = this.viewWorkout.bind(this);
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

    addWorkout(clientId) {
        redirectByName("ADD_WORKOUT");
    }

    viewWorkout() {

    }

    viewProfile() {

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
                            {!isEmpty(clients) ? clients.map((client, key) =>
                                <div key={key}>
                                    <ListElement
                                        index={key}
                                        isClicked={isClicked}
                                        nick_name={client.nick_name}
                                        first_name={client.first_name}
                                        middle_name={client.middle_name}
                                        last_name={client.last_name}
                                        img_thumb={client.img_thumb}
                                        onClick={this.onClick.bind(this)}>

                                        <p className="no-margin">
                                            <label className="field no-margin">Goal: </label>
                                            <label className="value no-margin">
                                                {client.primary_goal ?` ${client.primary_goal}` : " NOT ENTERED"}
                                            </label>
                                        </p>
                                        <p className="no-margin">
                                            <label className="field no-margin">Workout updated on:</label>
                                            <label className="value no-margin">
                                                {client.workout_update_date ? ` ${getFormattedDate(client.workout_update_date)}` : " NOT ASSIGNED"}
                                            </label>
                                        </p>
                                    </ListElement>
                                    <div>
                                        <Fade>
                                            {isClicked[key] ?
                                                <div className="list-dropdown-mobile-visible">
                                                    <button className="btn-hebecollins-orange">Add Workout</button>
                                                    <button className="btn-hebecollins-orange">View Workout</button>
                                                    <button className="btn-hebecollins-orange">View Profile
                                                    </button>
                                                </div> :
                                                <div/>
                                            }
                                        </Fade>
                                    </div>
                                </div>) : <p/>
                            }
                        </Scrollable>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-7 hidden-xs round-edged-box">
                        {!isEmpty(clients)
                            ?
                            <div className="list-monitor">
                                <p className="list-monitor-header">
                                    {clients[index].first_name + " " + clients[index].middle_name
                                    + " " + clients[index].last_name}
                                    {` (${clients[index].nick_name})`}
                                </p>
                                <div className="list-monitor-elements">
                                    <div className="list-monitor-left-box">
                                        <p>
                                            <label className="field">Batch :</label>
                                            <label className="value">{` ${clients[index].batch}`}</label>
                                            </p>
                                        <p>
                                            <label className="field">Age :</label>
                                            <label className="value">{` ${clients[index].age}`}</label>
                                        </p>
                                        <p>
                                            <label className="field">Gender : </label>
                                            <label className="value">{` ${getGenderFromGenderCode(clients[index].gender)}`}</label>
                                        </p>
                                        <p>
                                            <label className="field">Joining date :</label>
                                            <label className="value">{` ${getFormattedDate(clients[index].joining_date)}`}</label>
                                        </p>

                                        <div className="bottom-of-div pager">
                                            <button className="btn-hebecollins-orange"
                                                    onClick={() => this.viewProfile(clients[index].client_id)}>View Profile
                                            </button>
                                        </div>
                                    </div>

                                    <div className="list-monitor-right-box">
                                        <p>
                                            <label className="field">Goal Description:</label>
                                            <label className="value">{clients[index].goal_description ?
                                            ` ${clients[index].goal_description}` : " NOT ENTERED"}</label>
                                        </p>
                                        <p>
                                            <label className="field">Remarks: </label>
                                            <label className="value">
                                                {clients[index].remarks ? ` ${clients[index].remarks}` : " NOT ENTERED"}
                                                </label>
                                            <span className="pull-right glyphicon glyphicon-edit"/></p>
                                        <div className="bottom-of-div pager">
                                            <button className="btn-hebecollins-orange"
                                                    onClick={() => this.addWorkout(clients[index].client_id)}>Add
                                                Workout
                                            </button>
                                            <button className="btn-hebecollins-orange"
                                                    onClick={() => this.viewWorkout(clients[index].client_id)}>View
                                                Workout
                                            </button>
                                        </div>

                                    </div>
                                </div>

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