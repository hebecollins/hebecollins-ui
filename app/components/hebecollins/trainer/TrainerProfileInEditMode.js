import React from 'react'
import {getProfile, updateProfileInfoForTrainer} from "../../../actions/profileActions";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {Loading} from "../../others/extra/Loading";
import {EditBox, EditInfo} from "../../others/display/EditInfo";
import {ImageCrop} from "../../others/extra/ImageCrop";
import {BasicInfo, ContactInfo} from "../../others/display/ProfileInfo";

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
            editingImage: false,
            isLoading: false
        };
        this.experienceEditing = this.experienceEditing.bind(this);
        this.achievementEditing = this.achievementEditing.bind(this);
        this.specialityEditing = this.specialityEditing.bind(this);
        this.certificationEditing = this.certificationEditing.bind(this);
        this.editImage = this.editImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
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

    onCancel() {
        this.setState({editingImage: false})
    }

    onSubmit() {
        this.setState({isLoading: true});
        updateProfileInfoForTrainer(this.state).then(res => {
                this.setState({
                    isExperienceEditing: false,
                    isAchievementsEditing: false,
                    isCertificationsEditing: false,
                    isSpecialityEditing: false,
                    isLoading: false
                })
            }
        )
    }

    render() {
        const {
            info, hasServerResponded, isExperienceEditing, isAchievementsEditing, editingImage, profile_pic,
            isCertificationsEditing, isSpecialityEditing, experience, certifications, achievements, speciality
            , isLoading
        } = this.state;

        const experienceForm =
            <EditBox onChange={this.onChange} onSubmit={this.onSubmit} onCancel={this.experienceEditing}
                     isLoading={isLoading} field={"experience"} value={experience}/>;

        const certificationForm =
            <EditBox onChange={this.onChange} onSubmit={this.onSubmit} onCancel={this.certificationEditing}
                     isLoading={isLoading} field={"certifications"} value={certifications}/>;

        const achievementForm =
            <EditBox onChange={this.onChange} onSubmit={this.onSubmit} onCancel={this.achievementEditing}
                     isLoading={isLoading} field={"achievements"} value={achievements}/>;


        const specialityForm =
            <EditBox onChange={this.onChange} onSubmit={this.onSubmit} onCancel={this.specialityEditing}
                     isLoading={isLoading} field={"speciality"} value={speciality}/>;

        return ( !hasServerResponded ? <Loading/> : <div className="content quote-box">
                <div className="black-box">
                    <div className="profile">
                        <div className="profile-pic-container">
                            <img className="profile-pic" src={profile_pic}/>
                            {editingImage ? <div className="pop-on-screen">
                                <ImageCrop onSubmit={this.onImageSubmit} onCancel={this.onCancel}/>
                            </div> : <div/>}
                            <div className="edit-image-icon">
                                <a onClick={this.editImage}>
                                    <span className="glyphicon glyphicon-camera"/>
                                </a>
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