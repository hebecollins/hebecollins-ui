import React from 'react'
import {addSelectedTrainerToRedux, trainerListForClient} from "../../../actions/userListActions"
import {connect} from "react-redux"
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler"
import {ListElement} from "../../others/frames/userList/ListElement"
import Scrollable from "../../others/extra/Scrollable";
import {deepCloneArray, getFormattedDate, getGenderFromGenderCode} from "../../../Toolbox/Helpers/extra";
import {redirectByName} from "../../../Toolbox/Helpers/redirect";
import {FieldValue} from "../../others/display/DisplayText";
import {ButtonOrange} from "../../others/display/Buttons";
import {UserMonitor} from "../../others/frames/userList/UserMonitor";
import {Loading} from "../../others/extra/Loading"
import Rate from "../../others/extra/Rate";

class TrainerListForClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trainers: [],//it is the list of client information sent from the server
            index: 0,//index of the client []
            isClicked: [true],//if a tab in client list is clicked
            isLoading: false,//when edit remark button is pressed this turns true, when it is submitted it turns fasle
            hasServerResponded: false//whether array returned from server is empty
        };
        this.onChange = this.onChange.bind(this);
        this.onReviewButtonClick = this.onReviewButtonClick.bind(this);
    }

    /** It sends clientList request to the server and stores the first client from that response in
     * redux and local storage.
     */
    componentWillMount() {
        const {selectedGym} = this.props;
        trainerListForClient(selectedGym.gym_id).then(
            (res) => {
                const trainers = res.data.trainers;
                this.setState({trainers: trainers, hasServerResponded: true});
            }
        ).catch(err => errorResponse(err))
    }


    /** It gets triggered when a user is selected from the list
     * @param index => index of the user from the client[] array
     */
    onClick(index) {
        const isClicked = [];
        isClicked[index] = true;
        this.setState({index: index, isClicked: deepCloneArray(isClicked)})
    }

    onReviewButtonClick() {
        const trainerCloned = deepCloneArray(this.state.trainers[this.state.index]);
        this.props.addSelectedTrainerToRedux(trainerCloned);
        redirectByName('TRAINER_REVIEW_FOR_CLIENT');
    }

    onChange(e) {
        this.setState({remarks: e.target.value})
    }

    render() {
        const viewProfileButton =
            <ButtonOrange
                onClick={() => redirectByName('CLIENT_PROFILE')}
                disabled={this.state.isLoading}
                label={"View Profile"}/>;


        //redirects towards addWorkout page
        const viewReviewButton =
            <ButtonOrange
                onClick={this.onReviewButtonClick}
                disabled={this.state.isLoading}
                label={"View Reviews"}/>;


        //it is the client list
        const listBox = (trainers) => {
            return (
                <Scrollable>
                    {trainers.map((trainer, key) => {
                            const {
                                nick_name, name, img_thumb, rating, reviewer_count, rank
                            } = trainer;
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
                                        <Rate value={rating} isAggregateRating={true} isSelectable={false}/>
                                        <label className="x-small-label">({reviewer_count} Reviews)</label>

                                        <FieldValue
                                            field={"Rank"}
                                            value={`#${rank}`}
                                            noMargin={true}/>

                                    </div>

                                    {/*box that shows up only when an element is clicked and that too on small screens*/}
                                    <div key="mobile-visible">
                                        {viewProfileButton}
                                        {viewReviewButton}
                                    </div>
                                </ListElement>
                            </div>
                        }
                    )}</Scrollable>
            )
        };

        //it is the description of client on the right side of the screen
        const monitorBox = (trainer) => {
            const {nick_name, name} = trainer;
            return (
                <UserMonitor
                    name={name}
                    nickName={nick_name}>

                    {/*left side of list-monitor box*/}
                    {monitorSubBoxLeft(trainer)}

                    {/*right side of list-monitor box*/}
                    {monitorSubBoxRight(trainer)}

                </UserMonitor>
            )
        };

        const monitorSubBoxLeft = (trainer) => {
            const {mobile, country_code, age, gender, joining_date} = trainer;
            return (
                <div key="left-box">

                    <FieldValue field={"Age"} value={age}/>
                    <FieldValue field={"Gender"} value={getGenderFromGenderCode(gender)}/>
                    <FieldValue field={"Joined On"} value={getFormattedDate(joining_date)}/>
                    <FieldValue field={"Contact"} value={`+${country_code}-${mobile}`}/>
                    <div className="bottom-of-div pager">{viewProfileButton}</div>
                </div>
            )
        };

        const monitorSubBoxRight = (trainer) => {
            const {experience, client_count} = trainer;
            return (
                <div key="right-box">
                    <FieldValue field={"Clients"} value={client_count}/>
                    <FieldValue field={"Experience"} value={experience ? (experience + " months") : "NOT ENTERED"}/>
                    <div className="bottom-of-div pager">
                        {viewReviewButton}
                    </div>
                </div>
            )
        };

        return this.state.hasServerResponded ?
            <div className="content">
                <div className="row">

                    {/*left side of clientList page*/}
                    <div className="col col-lg-5 col-md-5 col-sm-5 col-xs-12 round-edged-box less-padding">
                        <p className="list-header">Trainer List</p>
                        <div className="user-list">
                            {listBox(this.state.trainers)}
                        </div>
                    </div>

                    {/*right side of the clientList page. It is mobile hidden*/}
                    <div className="col-lg-7 col-md-7 col-sm-7 hidden-xs round-edged-box">
                        {monitorBox(this.state.trainers[this.state.index])}
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

export default connect(mapStateToProps, {addSelectedTrainerToRedux})(TrainerListForClient);