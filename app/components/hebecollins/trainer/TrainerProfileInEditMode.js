import React from 'react'
import {getProfile, updateProfileInfo} from "../../../actions/profileActions";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {getFormattedDate, getGenderFromGenderCode} from "../../../Toolbox/Helpers/extra";
import {Loading} from "../../others/extra/Loading";
import {CommentBox, TextField} from "../../others/inputField/InputFieldWithIconAddOn";
import {ButtonOrange} from "../../others/display/Buttons";
import {EditInfo} from "../../others/display/EditInfo";
import {ImageCrop} from "../../others/extra/ImageCrop";

class TrainerProfileInEditMode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            profile_pic: '',
            isSpecialityEditing: false,
            isAchievementsEditing: false,
            isCertificationsEditing: false,
            isExperienceEditing: false,
            hasServerResponded: false,
            experience: '',
            speciality: '',
            certifications: '',
            achievements: '',
            editingImage: false
        };
        this.experienceEditing = this.experienceEditing.bind(this);
        this.achievementEditing = this.achievementEditing.bind(this);
        this.specialityEditing = this.specialityEditing.bind(this);
        this.certificationEditing = this.certificationEditing.bind(this);
        this.editImage = this.editImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
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
                experience: res.data.experience,
                achievements: res.data.achievements,
                certifications: res.data.certifications,
                speciality: res.data.speciality
            });
        }).catch(err => errorResponse(err));
    }

    experienceEditing() {
        this.setState({isExperienceEditing: !this.state.isExperienceEditing})
    }

    certificationEditing() {
        this.setState({isCertificationsEditing: !this.state.isCertificationsEditing})
    }

    achievementEditing() {
        this.setState({isAchievementsEditing: !this.state.isAchievementsEditing})
    }

    specialityEditing() {
        this.setState({isSpecialityEditing: !this.state.isSpecialityEditing})
    }

    editImage() {
        this.setState({editingImage: true})
    }

    onImageSubmit(profilePic) {
        this.setState({editingImage: false, profile_pic: profilePic})
    }

    onSubmit() {
        updateProfileInfo(this.state).then(res => {
                this.setState({
                    isExperienceEditing: false,
                    isAchievementsEditing: false,
                    isCertificationsEditing: false,
                    isSpecialityEditing: false
                })
            }
        )
    }

    render() {
        const {
            info, hasServerResponded, isExperienceEditing, isAchievementsEditing, editingImage, profile_pic,
            isCertificationsEditing, isSpecialityEditing, experience, certifications, achievements, speciality
        } = this.state;

        const experienceForm = <div>
            <CommentBox
                field={"experience"}
                value={experience}
                label={""}
                onChange={this.onChange}
                isIconNeeded={false}
            />
            <ButtonOrange disabled={false} label={"Done"} onClick={this.onSubmit}/>
            <ButtonOrange disabled={false} label={"Cancel"} onClick={this.experienceEditing}/>
        </div>;

        const certificationForm = <div>
            <CommentBox
                field={"certifications"}
                value={certifications}
                label={""}
                onChange={this.onChange}
                isIconNeeded={false}
            />
            <ButtonOrange disabled={false} label={"Done"} onClick={this.onSubmit}/>
            <ButtonOrange disabled={false} label={"Cancel"} onClick={this.certificationEditing}/>
        </div>;

        const achievementForm = <div>
            <CommentBox
                field={"achievements"}
                value={achievements}
                label={""}
                onChange={this.onChange}
                isIconNeeded={false}
            />
            <ButtonOrange disabled={false} label={"Done"} onClick={this.onSubmit}/>
            <ButtonOrange disabled={false} label={"Cancel"} onClick={this.achievementEditing}/>
        </div>;

        const specialityForm = <div>
            <CommentBox
                field={"speciality"}
                value={speciality}
                label={""}
                onChange={this.onChange}
                isIconNeeded={false}
            />
            <ButtonOrange disabled={false} label={"Done"} onClick={this.onSubmit}/>
            <ButtonOrange disabled={false} label={"Cancel"} onClick={this.specialityEditing}/>
        </div>;


        return ( !hasServerResponded ? <Loading/> : <div className="content quote-box">
                <div className="black-box">
                    <div className="profile">
                        <div className="profile-pic-container">
                            <img className="profile-pic" src={profile_pic}/>

                            {editingImage ? <div className="pop-on-screen">
                                <ImageCrop onSubmit={this.onImageSubmit}/>
                            </div> : <div/>
                            }

                            <div className="edit-image-icon">
                                <a onClick={this.editImage}>
                                    <span className="glyphicon glyphicon-camera"/>
                                </a>
                            </div>
                        </div>
                        <div className="profile-data">
                            <div className="heading">Basic Information</div>
                            <div className="flex">
                                <h1 className="field">Full Name : </h1>
                                <h1 className="value">{info.name}</h1>
                            </div>
                            <div className="flex">
                                <h1 className="field">Nick Name : </h1>
                                <h1 className="value">{info.nick_name}</h1>
                            </div>
                            <div className="flex">
                                <h1 className="field">Gender : </h1>
                                <h1 className="value">{getGenderFromGenderCode(info.gender)}</h1>
                            </div>
                            <div className="flex">
                                <h1 className="field">Age : </h1>
                                <h1 className="value">{getGenderFromGenderCode(info.age)}</h1>
                            </div>
                            <div className="flex">
                                <h1 className="field">Birthday : </h1>
                                <h1 className="value">{getFormattedDate(info.dob)}</h1>
                            </div>


                            <div className="heading">Contact Information</div>
                            <div className="flex">
                                <h1 className="field">Email : </h1>
                                <h1 className="value">{info.email}</h1>
                            </div>
                            <div className="flex">
                                <h1 className="field">Mobile : </h1>
                                <h1 className="value">{`+${info.country_code}-` + info.mobile}</h1>
                            </div>


                            <div className="heading">Professional Information</div>

                            <EditInfo
                                editingForm={experienceForm}
                                label={"Experience"}
                                value={experience}
                                editingAction={this.experienceEditing}
                                isEditing={isExperienceEditing}
                            />

                            <EditInfo
                                editingForm={certificationForm}
                                label={"Certifications"}
                                value={certifications}
                                editingAction={this.certificationEditing}
                                isEditing={isCertificationsEditing}
                            />

                            <EditInfo
                                editingForm={achievementForm}
                                label={"Achievements"}
                                value={achievements}
                                editingAction={this.achievementEditing}
                                isEditing={isAchievementsEditing}
                            />

                            <EditInfo
                                editingForm={specialityForm}
                                label={"Speciality"}
                                value={speciality}
                                editingAction={this.specialityEditing}
                                isEditing={isSpecialityEditing}
                            />

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TrainerProfileInEditMode;