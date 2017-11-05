import React from 'react'
import {addSelectedUserToRedux, clientListForTrainer, postRemarkToServer} from "../../../actions/userListActions"
import {connect} from "react-redux"
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler"
import isEmpty from 'lodash/isEmpty'
import {ListElement} from "../../others/frames/userList/ListElement"
import Scrollable from "../../others/extra/Scrollable";
import {deepCloneArray, getFormattedDate, getGenderFromGenderCode} from "../../../Toolbox/Helpers/extra";
import {redirectByName} from "../../../Toolbox/Helpers/redirect";
import {message} from "../../../Toolbox/Helpers/messages";
import {FieldValue} from "../../others/display/DisplayText";
import {ButtonOrange} from "../../others/display/Buttons";
import {UserMonitor} from "../../others/frames/userList/UserMonitor";
import {Remarks} from "../../others/display/Remarks";
import {Loading} from "../../others/extra/Loading"

class ClientListForTrainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],//it is the list of client information sent from the server
            index: 0,//index of the client []
            isClicked: [true],//if a tab in client list is clicked
            isEditingRemarks: false,//if the person is editing this
            isLoading: false,//when edit remark button is pressed this turns true, when it is submitted it turns fasle
            remarks: "",
            responseRecieved: false//whether array returned from server is empty
        };
        this.editRemarks = this.editRemarks.bind(this);
        this.remarkSubmitted = this.remarkSubmitted.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    /** It sends clientList request to the server and stores the first client from that response in
     * redux and local storage.
     */
    componentWillMount() {
        const {selectedGym} = this.props;
        clientListForTrainer(selectedGym.gym_id).then(
            (res) => {
                const clients = res.data.clients;
                this.setState({clients: clients, responseRecieved: true});
                //adds first user in the list to redux
                const clientCloned = deepCloneArray(clients[this.state.index]);
                this.props.addSelectedUserToRedux(clientCloned.client_id, "client", clientCloned.nick_name);
            }
        ).catch(err => redirectByName("NO_RECORDS_FOUND"))
    }


    /** It gets triggered when a user is selected from the list
     * @param index => index of the user from the client[] array
     */
    onClick(index) {
        const clientCloned = deepCloneArray(this.state.clients[index]);
        this.props.addSelectedUserToRedux(clientCloned.client_id, "client", clientCloned.nick_name);
        const isClicked = [];
        isClicked[index] = true;
        this.setState({index: index, isClicked: deepCloneArray(isClicked)})
    }

    editRemarks() {//it is called when 'edit' button is clicked
        this.setState({isEditingRemarks: true, isLoading: false});
    }

    onChange(e) {
        this.setState({remarks: e.target.value})
    }

    /**When a remark is submitted, it sends remark to server and if it gets a success response
     * it copies that remark into client[] array. So, basically it is not fetching the updated
     * remark from the server but assuming that if server is sending a 'success', it means
     * remark has been updated.
     * @param index => integer, index of array client
     * */
    remarkSubmitted(index) {
        const {selectedUser, selectedGym} = this.props;
        this.setState({isLoading: true});

        postRemarkToServer(this.state.remarks, selectedUser.user_id, selectedGym.gym_id).then(
            (res) => {
                let tempClients = deepCloneArray(this.state.clients);
                tempClients[index].remarks = this.state.remarks;
                this.setState({isEditingRemarks: false, clients: tempClients});
            }
        ).catch((err) => errorResponse(err));
    }

    render() {
        const viewProfileButton =
            <ButtonOrange
                onClick={() => redirectByName('CLIENT_PROFILE')}
                disabled={this.state.isLoading}
                label={"View Profile"}/>;


        //redirects towards addWorkout page
        const addWorkoutButton =
            <ButtonOrange
                onClick={() => redirectByName('ASSIGN_WORKOUT')}
                disabled={this.state.isLoading}
                label={"Assign Workout"}/>;


        const viewWorkoutButton =
            <ButtonOrange
                onClick={() => redirectByName('VIEW_WORKOUT')}
                disabled={this.state.isLoading}
                label={"View Workout"}/>;


        //it is the client list
        const listBox = (clients) => {
            return (
                <Scrollable>
                    {clients.map((client, key) => {
                            const {
                                nick_name, first_name, middle_name, last_name, img_thumb,
                                primary_goal, workout_update_date
                            } = client;
                            return <div key={key}>
                                <ListElement
                                    index={key}
                                    isClicked={this.state.isClicked}
                                    nickName={nick_name}
                                    firstName={first_name}
                                    middleName={middle_name}
                                    lastName={last_name}
                                    imgThumb={img_thumb}
                                    onClick={this.onClick.bind(this)}>

                                    {/*data inside the list element box*/}
                                    <div key="all-visible">
                                        <FieldValue
                                            field={"Goal"}
                                            value={primary_goal ? primary_goal : message.notEntered}
                                            noMargin={true}/>

                                        <FieldValue
                                            field={"Workout Updated On"}
                                            value={workout_update_date ? getFormattedDate(workout_update_date) : message.notAssigned}
                                            noMargin={true}/>
                                    </div>

                                    {/*box that shows up only when an element is clicked and that too on small screens*/}
                                    <div key="mobile-visible">
                                        {viewProfileButton}
                                        {addWorkoutButton}
                                        {viewWorkoutButton}
                                    </div>
                                </ListElement>
                            </div>
                        }
                    )}</Scrollable>
            )
        };

        //it is the description of client on the right side of the screen
        const monitorBox = (client) => {
            const {nick_name, first_name, middle_name, last_name} = client;
            return (
                <UserMonitor
                    firstName={first_name}
                    middleName={middle_name}
                    lastName={last_name}
                    nickName={nick_name}>

                    {/*left side of list-monitor box*/}
                    {monitorSubBoxLeft(client)}

                    {/*right side of list-monitor box*/}
                    {monitorSubBoxRight(client)}

                </UserMonitor>
            )
        };

        const monitorSubBoxLeft = (client) => {
            const {batch, age, gender, joining_date} = client;
            return (
                <div key="left-box">

                    <FieldValue field={"Batch"} value={batch}/>
                    <FieldValue field={"Age"} value={age}/>
                    <FieldValue field={"Gender"} value={getGenderFromGenderCode(gender)}/>
                    <FieldValue field={"Joined On"} value={getFormattedDate(joining_date)}/>

                    <div className="bottom-of-div pager">{viewProfileButton}</div>
                </div>
            )
        };

        const monitorSubBoxRight = (client) => {
            const {goal_description, remarks} = client;
            return (
                <div key="right-box">
                    <FieldValue
                        field={"Goal Description"}
                        value={goal_description ? goal_description : message.notEntered}/>

                    {/*remark or remark form , depends on the current state*/}
                    <Remarks
                        value={remarks ? remarks : message.notEntered}
                        remarks={this.state.remarks}
                        isEditing={this.state.isEditingRemarks}
                        isLoading={this.state.isLoading}
                        editRemarks={this.editRemarks}
                        onChange={this.onChange}
                        onSubmit={() => this.remarkSubmitted(this.state.index)}/>

                    <div className="bottom-of-div pager">
                        {addWorkoutButton}
                        {viewWorkoutButton}
                    </div>
                </div>
            )
        };

        return this.state.responseRecieved ?
            <div className="content">
                <div className="row">

                    {/*left side of clientList page*/}
                    <div className="col col-lg-5 col-md-5 col-sm-5 col-xs-12 round-edged-box">
                        <p className="list-header">Client List</p>
                        {listBox(this.state.clients)}
                    </div>

                    {/*right side of the clientList page. It is mobile hidden*/}
                    <div className="col-lg-7 col-md-7 col-sm-7 hidden-xs round-edged-box">
                        {monitorBox(this.state.clients[this.state.index])}
                    </div>
                </div>
            </div> : <Loading/>

    }
}

function mapStateToProps(state) {
    return {
        selectedGym: state.selectedGym,
        selectedUser: state.selectedUser
    }
}

export default connect(mapStateToProps, {addSelectedUserToRedux})(ClientListForTrainer);