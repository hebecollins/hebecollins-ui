import React from 'react'
import {addSelectedUserToRedux, clientListForManager, postRemarkToServer} from "../../../actions/userListActions"
import {connect} from "react-redux"
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler"
import isEmpty from 'lodash/isEmpty'
import {ListElement} from "../../others/frames/ListElement"
import Scrollable from "../../others/extra/Scrollable";
import {deepCloneArray, getFormattedDate, getGenderFromGenderCode} from "../../../Toolbox/Helpers/extra";
import {redirectByName} from "../../../Toolbox/Helpers/redirect";
import {message} from "../../../Toolbox/Helpers/messages";
import {FieldValue} from "../../others/display/DisplayText";
import {ButtonOrange} from "../../others/display/Buttons";
import {UserMonitor} from "../../others/frames/UserMonitor";
import {Remarks} from "../../others/display/Remarks";
import {addFlashMessage} from "../../../actions/actionStore";

class ClientListForManager extends React.Component {
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
                this.setState({clients: clients,});

                console.log(clients);
                //adds first user in the list to redux
                const clientCloned = deepCloneArray(clients[this.state.index]);
                this.props.addSelectedUserToRedux(clientCloned.client_id, "client", clientCloned.nick_name);
            }
        ).catch(err => errorResponse(err))
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

    viewTrainerProfile() {

    }

    viewProfile() {

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
        ).catch((err) => {
            addFlashMessage({
                type: "error",
                text: err.response.data.msg
            })
        });
    }

    render() {
        const {clients, index, isClicked, isEditingRemarks, remarks, isLoading} = this.state;

        const viewProfileButton =
            <ButtonOrange
                onClick={() => this.viewProfile}
                disabled={isLoading}
                label={"View Profile"}/>;

        //redirects towards addWorkout page
        const viewTrainerProfileButton =
            <ButtonOrange
                onClick={() => this.viewTrainerProfile}
                disabled={isLoading}
                label={"View Trainer's Profile"}/>;


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
                                            field={"Joined On"}
                                            value={getFormattedDate(client.joining_date)}
                                            noMargin={true}/>

                                    </ListElement>

                                    {/*mobile visible and desktop hidden dropdown*/}
                                    <div>
                                        {isClicked[key] ?
                                            <div className="list-dropdown-mobile-visible">
                                                {viewProfileButton}
                                                {viewTrainerProfileButton}
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
                                        field={"Goal"}
                                        value={clients[index].primary_goal ? clients[index].primary_goal : message.notEntered}
                                    />

                                    <div className="bottom-of-div pager">
                                        {viewProfileButton}
                                    </div>
                                </div>

                                {/*right side of list-monitor box*/}
                                <div className="list-monitor-right-box">
                                    <FieldValue
                                        field={"Current Trainer"}
                                        value={clients[index].current_trainer ?
                                            ` ${clients[index].current_trainer}` : message.notEntered}
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
                                        {viewTrainerProfileButton}
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
        selectedGym: state.selectedGym,
        selectedUser: state.selectedUser
    }
}

export default connect(mapStateToProps, {addSelectedUserToRedux})(ClientListForManager);