import React from 'react'
import {addSelectedClientToRedux, clientListForManager, postRemarkToServer} from "../../../actions/userListActions"
import {connect} from "react-redux"
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler"
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

class ClientListForManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],//it is the list of client information sent from the server
            index: 0,//index of the client []
            isClicked: [true],//if a tab in client list is clicked
            isEditingRemarks: false,//if the person is editing this
            isLoading: false,//when edit remark button is pressed this turns true, when it is submitted it turns fasle
            remarks: "",
            hasServerResponded: false//whether array returned from server is empty
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
        clientListForManager(selectedGym.gym_id).then(
            (res) => {
                const clients = res.data.clients;
                this.setState({clients: clients, hasServerResponded: true});
            }
        ).catch(err => errorResponse(err))
    }


    // It gets triggered when a user is selected from the list
    onClick(index) {
        const isClicked = [];
        isClicked[index] = true;
        this.setState({
            index: index,
            isClicked: deepCloneArray(isClicked),
            isEditingRemarks: false,
            remarks: ''
        })
    }

    //writes the currently selected client to redux
    currentSelectedClient() {
        const clientCloned = deepCloneArray(this.state.clients[this.state.index]);
        this.props.addSelectedClientToRedux(clientCloned);
        return clientCloned;
    }

    onChange(e) {
        this.setState({remarks: e.target.value})
    }

    //it is called when 'edit' button is clicked
    editRemarks() {
        const currentClient = this.currentSelectedClient();
        this.setState({isEditingRemarks: true, isLoading: false, remarks: currentClient.remarks});
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

        postRemarkToServer(this.state.remarks, selectedUser.client_id, selectedGym.gym_id).then(
            (res) => {
                let tempClients = deepCloneArray(this.state.clients);
                tempClients[index].remarks = this.state.remarks;
                this.setState({isEditingRemarks: false, isLoading: false, clients: tempClients});
            }
        ).catch((err) => errorResponse(err));
    }

    render() {

        const viewProfileButton =
            <ButtonOrange
                onClick={() => redirectByName('NO_RECORDS_FOUND')}
                disabled={this.state.isLoading}
                label={"View Profile"}/>;

        //redirects towards addWorkout page
        const viewTrainerProfileButton =
            <ButtonOrange
                onClick={() => redirectByName('NO_RECORDS_FOUND')}
                disabled={this.state.isLoading}
                label={"View Trainer's Profile"}/>;

        //it is the client list
        const listBox = (clients) => {
            return (
                <Scrollable>
                    {clients.map((client, key) => {
                            const {
                                nick_name, name, img_thumb, joining_date
                            } = client;
                            return <div key={key}>
                                <ListElement
                                    index={key}
                                    isClicked={this.state.isClicked}
                                    nickName={nick_name}
                                    name={name}
                                    imgThumb={img_thumb}
                                    onClick={this.onClick.bind(this)}>

                                    {/*data inside the list element box*/}
                                    <div key="all-visible">
                                        <FieldValue
                                            field={"Joined On"}
                                            value={getFormattedDate(joining_date)}
                                            noMargin={true}/>
                                    </div>

                                    {/*box that shows up only when an element is clicked and that too on small screens*/}
                                    <div key="mobile-visible">
                                        {viewProfileButton}
                                        {viewTrainerProfileButton}
                                    </div>
                                </ListElement>
                            </div>
                        }
                    )}</Scrollable>
            )
        };

        //it is the description of client on the right side of the screen
        const monitorBox = (client) => {
            const {nick_name, name} = client;
            return (
                <UserMonitor
                    name={name}
                    nickName={nick_name}>

                    {/*left side of list-monitor box*/}
                    {monitorSubBoxLeft(client)}

                    {/*right side of list-monitor box*/}
                    {monitorSubBoxRight(client)}

                </UserMonitor>
            )
        };

        const monitorSubBoxLeft = (client) => {
            const {batch, age, gender, primary_goal} = client;
            return (
                <div key="left-box">

                    <FieldValue field={"Batch"} value={batch ? batch : message.notEntered}/>
                    <FieldValue field={"Age"} value={age}/>
                    <FieldValue field={"Gender"} value={getGenderFromGenderCode(gender)}/>
                    <FieldValue field={"Goal"} value={primary_goal ? primary_goal : message.notEntered}/>

                    <div className="bottom-of-div pager">{viewProfileButton}</div>
                </div>
            )
        };

        const monitorSubBoxRight = (client) => {
            const {remarks, current_trainer} = client;
            return (
                <div key="right-box">
                    <FieldValue
                        field={"Current Trainer"}
                        value={current_trainer}/>

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
                        {viewTrainerProfileButton}
                    </div>
                </div>
            )
        };

        return this.state.hasServerResponded ?
            <div className="content">
                <div className="row">

                    {/*left side of clientList page*/}
                    <div className="col col-lg-5 col-md-5 col-sm-5 col-xs-12 round-edged-box less-padding">
                        <p className="list-header">Client List</p>
                        <div className="user-list">
                            {listBox(this.state.clients)}
                        </div>
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

export default connect(mapStateToProps, {addSelectedClientToRedux})(ClientListForManager);