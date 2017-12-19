import React from 'react'
import {
    getProfile, updateProfileInfoForClient, updateProfileInfoForTrainer,
    updateProfilePic
} from "../../../actions/profileActions";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {Loading} from "../../others/extra/Loading";
import {EditBox, EditInfo, EditOptions} from "../../others/display/EditInfo";
import {ImageCrop} from "../../others/extra/ImageCrop";
import {BasicInfo, ContactInfo} from "../../others/display/ProfileInfo";
import {UploadFile} from "../../others/inputField/InputFieldWithIconAddOn";

class ClientProfileInEditMode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            profile_pic: '',
            isBatchEditing: false,
            isGoalEditing: false,
            isGoalDescriptionEditing: false,
            hasServerResponded: false,
            batch: '',
            goal: '',
            goal_description: '',
            editingImage: false,
            uploadedImage:'',
            isLoading: false
        };
        this.batchEditing = this.batchEditing.bind(this);
        this.goalEditing = this.goalEditing.bind(this);
        this.goalDescriptionEditing = this.goalDescriptionEditing.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onImageUpload = this.onImageUpload.bind(this);
        this.onImageSubmit = this.onImageSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    componentWillMount() {
        getProfile().then(res => {
            this.setState({
                info: res.data,
                profile_pic: res.data.profile_pic,
                hasServerResponded: true,
                batch: res.data.batch,
                goal: res.data.primary_goal,
                goal_description: res.data.goal_description,
            });
        }).catch(err => errorResponse(err));
    }

    batchEditing() {
        this.setState({isBatchEditing: !this.state.isBatchEditing})
    }

    goalEditing() {
        this.setState({isGoalEditing: !this.state.isGoalEditing})
    }

    goalDescriptionEditing() {
        this.setState({isGoalDescriptionEditing: !this.state.isGoalDescriptionEditing})
    }

    onImageUpload(e){
        const image = e.target.files[0];
        this.setState({uploadedImage:image, editingImage:true});
    }

    onImageSubmit(profilePic) {
        this.setState({editingImage: false, profile_pic: profilePic})
    }

    onCancel() {
        this.setState({editingImage: false})
    }

    onSubmit() {
        this.setState({isLoading: true});
        updateProfileInfoForClient(this.state).then(res => {
                this.setState({
                    isGoalEditing: false,
                    isBatchEditing: false,
                    isGoalDescriptionEditing: false,
                    isLoading: false
                })
            }
        )
    }

    render() {
        const {
            info, hasServerResponded, isGoalEditing, isGoalDescriptionEditing, editingImage, profile_pic,
            isBatchEditing, batch, goal_description, goal, isLoading} = this.state;

        const batchForm =
            <EditOptions onChange={this.onChange} onSubmit={this.onSubmit} onCancel={this.batchEditing}
                         isLoading={isLoading} field={"batch"} value={batch}>
                <option value={"Morning"}>Morning</option>
                <option value={"Afternoon"}>Afternoon</option>
                <option value={"Evening"}>Evening</option>
                <option value={"Night"}>Night</option>
            </EditOptions>;

        const goalForm =
            <EditOptions onChange={this.onChange} onSubmit={this.onSubmit} onCancel={this.batchEditing}
                         isLoading={isLoading} field={"goal"} value={goal}>
                <option value={"Weight-loss"}>Weight-loss</option>
                <option value={"Weight-gain"}>Weight-gain</option>
                <option value={"Fat-loss"}>Fat-loss</option>
                <option value={"Muscle-gain"}>Muscle-gain</option>
                <option value={"General fitness"}>General fitness</option>
                <option value={"Athleticism"}>Athleticism</option>
            </EditOptions>;

        const goalDescriptionForm =
            <EditBox onChange={this.onChange} onSubmit={this.onSubmit} onCancel={this.goalDescriptionEditing}
                     isLoading={isLoading} field={"goal_description"} value={goal_description}/>;

        return ( !hasServerResponded ? <Loading/> : <div className="content quote-box">
                <div className="black-box">
                    <div className="profile">
                        <div className="profile-pic-container">
                            <img className="profile-pic" src={profile_pic}/>
                            {editingImage ? <div className="pop-on-screen">
                                <ImageCrop
                                    onSubmit={this.onImageSubmit}
                                    onCancel={this.onCancel}
                                    image={this.state.uploadedImage}
                                    uploadImageToServer={updateProfilePic}
                                />
                            </div> : <div/>}
                            <div className="edit-image-icon">
                                <label htmlFor="image-upload">
                                    <span className="glyphicon glyphicon-camera"/>
                                </label>
                                <UploadFile onUpload={this.onImageUpload} field='image-upload'/>
                            </div>
                        </div>

                        <div className="profile-data">
                            <BasicInfo
                                name={info.name}
                                nick_name={info.nick_name}
                                dob={info.dob}
                                gender={info.gender}
                                age={info.age}/>

                            <ContactInfo
                                email={info.email}
                                country_code={info.country_code}
                                mobile={info.mobile}
                            />

                            <div className="heading">Workout Information</div>
                            <EditInfo
                                editingForm={batchForm}
                                label={"Batch"}
                                value={batch}
                                editingAction={this.batchEditing}
                                isEditing={isBatchEditing}
                            />
                            <EditInfo
                                editingForm={goalForm}
                                label={"Goal"}
                                value={goal}
                                editingAction={this.goalEditing}
                                isEditing={isGoalEditing}
                            />

                            <EditInfo
                                editingForm={goalDescriptionForm}
                                label={"Goal Description"}
                                value={goal_description}
                                editingAction={this.goalDescriptionEditing}
                                isEditing={isGoalDescriptionEditing}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ClientProfileInEditMode;