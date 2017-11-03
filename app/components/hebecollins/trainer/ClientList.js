import React from 'react'
import {
    addSelectedUserToRedux, clientListForTrainer, postRemark,
    postRemarkToServer
} from "../../../actions/userListActions"
import {connect} from "react-redux"
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler"
import isEmpty from 'lodash/isEmpty'
import {ListElement} from "../../others/frames/ListElement"
import Scrollable from "../../others/extra/Scrollable";
import {deepCloneArray, getFormattedDate, getGenderFromGenderCode} from "../../../Toolbox/Helpers/extra";
import {Fade, Slide} from "../../others/extra/Animation";
import {redirectByName} from "../../../Toolbox/Helpers/redirect";
import {message} from "../../../Toolbox/Helpers/messages";
import {CommentBox, TextField} from "../../others/inputField/InputFieldWithIcon";
import {FieldValue} from "../../others/display/DisplayText";
import {ButtonBlack, ButtonOrange} from "../../others/display/Buttons";
import {UserMonitor} from "../../others/frames/UserMonitor";
import {Remarks} from "../../others/display/Remarks";
import {addFlashMessage} from "../../../actions/actionStore";

class ClientList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],//it is the list of client information sent from the server
            index: 0,//index of the client []
            isClicked: [true],//if a tab in client list is clicked
            isEditingRemarks: false,//if the person is editing this
            isLoading: false,//when edit remark button is pressed this turns true, when it is submitted it turns fasle
            remarks: ""
        };
        this.addWorkout = this.addWorkout.bind(this);
        this.viewProfile = this.viewProfile.bind(this);
        this.viewWorkout = this.viewWorkout.bind(this);
        this.editRemarks = this.editRemarks.bind(this);
        this.remarkSubmitted = this.remarkSubmitted.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    /** It sends clientList request to the server and stores the first client from that response in
     * redux and local storage.
     */
    componentWillMount() {
        const {user} = this.props;
        const gymId = user.gym_list[0].gym_id;

        clientListForTrainer(gymId).then(
            (res) => {
                const clients = res.data.clients;
                this.setState({
                    clients: clients,
                });
                const clientCloned = deepCloneArray(clients[this.state.index]);
                this.props.addSelectedUserToRedux(clientCloned.client_id, "client",clientCloned.nick_name);
            }
        ).catch(err => {
                errorResponse(err)
            }
        )
    }


    /** It gets triggered when a user is selected from the list
     * @param index => index of the user from the client[] array
     */
    onClick(index) {
        const clientCloned = deepCloneArray(this.state.clients[index]);
        this.props.addSelectedUserToRedux(clientCloned.client_id, "client",clientCloned.nick_name);
        const isClicked = [];
        isClicked[index] = true;
        this.setState({index: index, isClicked: deepCloneArray(isClicked)})
    }

    addWorkout(clientId) {

    }

    viewWorkout() {

    }

    viewProfile() {

    }

    editRemarks() {//it should give an html form which should replace the txt in remark
        this.setState({isEditingRemarks: true, isLoading: false});
    }

    remarkSubmitted(index) {
        const {selectedUser,user} = this.props;

        const gymId = user.gym_list[0].gym_id;

        this.setState({isLoading: true});

        postRemarkToServer(this.state.remarks, selectedUser.user_id , gymId).then(
            (res)=>{
                let tempClients = deepCloneArray(this.state.clients);
                tempClients[index].remarks = this.state.remarks;
                this.setState({isEditingRemarks: false, clients: tempClients});
            }
        ).catch((err)=>{
            addFlashMessage({
                type:"error",
                text:err.response.data.msg
            })
        });

    }


    onChange(e) {
        this.setState({remarks: e.target.value})
    }


    render() {
        const {clients, index, isClicked, isEditingRemarks, remarks, isLoading} = this.state;

        const viewProfileButton =
            <ButtonOrange
                onClick={() => this.viewProfile(clients[index].client_id)}
                disabled={isLoading}
                label={"View Profile"}/>;

        const addWorkoutButton =
            <ButtonOrange
                onClick={() => this.addWorkout(clients[index].client_id)}
                disabled={isLoading}
                label={"Add Workout"}/>;

        const viewWorkoutButton =
            <ButtonOrange
                onClick={() => this.viewWorkout(clients[index].client_id)}
                disabled={isLoading}
                label={"View Workout"}/>;

        return (
            <div className="content">
                <div className="row">

                    {/*left side of clientList page*/}
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

                                        <FieldValue
                                            field={"Goal"}
                                            value={client.primary_goal ? client.primary_goal : message.notEntered}
                                            noMargin={true}/>

                                        <FieldValue
                                            field={"Workout Updated On"}
                                            value={client.workout_update_date ? getFormattedDate(client.workout_update_date) : message.notAssigned}
                                            noMargin={true}/>


                                    </ListElement>

                                    {/*mobile visible and desktop hidden dropdown*/}
                                    <div>
                                        {isClicked[key] ?
                                            <div className="list-dropdown-mobile-visible">
                                                {viewProfileButton}
                                                {addWorkoutButton}
                                                {viewWorkoutButton}
                                            </div> :
                                            <div/>
                                        }
                                    </div>

                                </div>) : <p/>
                            }
                        </Scrollable>
                    </div>

                    {/*right side of the clientList page. It is mobile hidden*/}
                    <div className="col-lg-7 col-md-7 col-sm-7 hidden-xs round-edged-box">
                        {!isEmpty(clients)
                            ?
                            <UserMonitor
                                firstName={clients[index].first_name}
                                middleName={clients[index].middle_name}
                                lastName={clients[index].last_name}
                                nickName={clients[index].nick_name}
                            >

                                {/*left side of list-monitor box*/}
                                <div className="list-monitor-left-box">
                                    <FieldValue
                                        field={"Batch"}
                                        value={` ${clients[index].batch}`}
                                    />

                                    <FieldValue
                                        field={"Age"}
                                        value={` ${clients[index].age}`}
                                    />

                                    <FieldValue
                                        field={"Gender"}
                                        value={`${getGenderFromGenderCode(clients[index].gender)}`}
                                    />

                                    <FieldValue
                                        field={"Joined On"}
                                        value={`${getFormattedDate(clients[index].joining_date)}`}
                                    />

                                    <div className="bottom-of-div pager">
                                        {viewProfileButton}
                                    </div>
                                </div>

                                {/*right side of list-monitor box*/}
                                <div className="list-monitor-right-box">
                                    <FieldValue
                                        field={"Goal Description"}
                                        value={clients[index].goal_description ?
                                            ` ${clients[index].goal_description}` : message.notEntered}
                                    />

                                    {/*remark or remark form , depends on the current state*/}
                                    <Remarks
                                        value={clients[index].remarks ? clients[index].remarks : message.notEntered}
                                        remarks={remarks}
                                        isEditing={isEditingRemarks}
                                        isLoading={isLoading}
                                        editRemarks={this.editRemarks}
                                        onChange={this.onChange}
                                        onSubmit={() => this.remarkSubmitted(index)}
                                    />

                                    <div className="bottom-of-div pager">
                                        {addWorkoutButton}
                                        {viewWorkoutButton}
                                    </div>
                                </div>
                            </UserMonitor> : <div/>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        selectedUser: state.selectedUser
    }
}

export default connect(mapStateToProps,{addSelectedUserToRedux})(ClientList);