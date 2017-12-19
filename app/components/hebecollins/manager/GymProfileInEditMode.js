import React from 'react'
import {getGymProfile, gymRatings, updateCoverPhoto, updateGymInfo, updateLogo} from "../../../actions/gymActions";
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty'
import {CommentBox, UploadFile} from "../../others/inputField/InputFieldWithIconAddOn";
import {ImageCrop} from "../../others/extra/ImageCrop";
import {Loading} from "../../others/extra/Loading";
import {EditBox, EditOptions} from "../../others/display/EditInfo";
import {DisplayGymAvgRating} from "../../others/display/DisplayGymAvgRating";
import {DisplayReviews} from "../../others/display/DisplayReviews";

class GymProfileInEditMode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coverPhoto: '',
            logo: '',
            about: '',
            operatingHours: '',
            operatingDays: '',
            feeStructure: '',
            profile: '',

            uploadedLogo: '',
            uploadedCoverPhoto: '',

            editingCoverPhoto: '',
            editingAbout: '',
            editingLogo: '',
            editingOperatingDays: '',
            editingOperatingHours: '',
            editingFeeStructure: '',

            avgRating: {},
            reviews: [],
            isLoading: false,
        };
        this.onCoverPhotoUpload = this.onCoverPhotoUpload.bind(this);
        this.onCoverPicSubmit = this.onCoverPicSubmit.bind(this);
        this.onLogoSubmit = this.onLogoSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onLogoUpload = this.onLogoUpload.bind(this);
        this.editAbout = this.editAbout.bind(this);
        this.editOperatingDays = this.editOperatingDays.bind(this);
        this.editOperatingHours = this.editOperatingHours.bind(this);
        this.editFeeStructure = this.editFeeStructure.bind(this);
        this.onInfoSubmit = this.onInfoSubmit.bind(this);
    }

    componentWillMount() {
        //gets profile data
        getGymProfile(this.props.gymId).then(res => {
            this.setState({
                profile: res.data,
                coverPhoto: res.data.cover_photo,
                logo: res.data.logo,
                about: res.data.about,
                operatingDays: res.data.operating_days,
                operatingHours: res.data.operating_hours,
                feeStructure: res.data.fee_structure
            });
        });

        //gets reviews
        gymRatings(this.props.gymId).then(res => {
            this.setState({
                avgRating: res.data.avg_rating,
                reviews: res.data.reviews
            })
        });
    }

    onCoverPhotoUpload(e) {
        const image = e.target.files[0];
        this.setState({uploadedCoverPhoto: image, editingCoverPhoto: true})
    }

    onLogoUpload(e) {
        const image = e.target.files[0];
        this.setState({uploadedLogo: image, editingLogo: true})
    }

    onCancel() {
        this.setState({
            editingCoverPhoto: false,
            editingLogo: false,
            editingAbout: false,
            editingOperatingDays: false,
            editingOperatingHours: false,
            editingFeeStructure: false,
        })
    }

    editAbout() {
        this.setState({editingAbout: true})
    }

    editOperatingDays() {
        this.setState({editingOperatingDays: true})
    }

    editOperatingHours() {
        this.setState({editingOperatingHours: true})
    }

    editFeeStructure() {
        this.setState({editingFeeStructure: true});
    }

    onCoverPicSubmit(coverPhoto) {
        this.setState({coverPhoto: coverPhoto, editingCoverPhoto: false})
    }

    onLogoSubmit(logo) {
        this.setState({logo: logo, editingLogo: false})
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onInfoSubmit() {
        updateGymInfo(this.state, this.props.gymId).then(res => {
            this.setState({
                editingAbout: false
            })
        });
    }

    render() {
        const {
            profile, editingCoverPhoto, editingLogo, editingAbout, editingOperatingDays, editingOperatingHours, editingFeeStructure,
            coverPhoto, logo, operatingDays, operatingHours
        } = this.state;

        return !isEmpty(profile) ?
            <div className="content black-box">
                <div className="cover-photo-container">
                    <img className="cover-photo" src={`${coverPhoto}`}/>
                    {editingCoverPhoto ?
                        <div className="pop-on-screen">
                            <ImageCrop
                                onSubmit={this.onCoverPicSubmit}
                                onCancel={this.onCancel}
                                image={this.state.uploadedCoverPhoto}
                                aspectRatio={2.5}
                                uploadImageToServer={updateCoverPhoto}
                            />
                        </div> : <div/>
                    }

                    <div className="edit-image-icon">
                        <label htmlFor="image-upload">
                            <span className="glyphicon glyphicon-camera"/>
                        </label>
                        <UploadFile onUpload={this.onCoverPhotoUpload} field='image-upload'/>
                    </div>
                </div>

                <div className="logo-container">
                    <img className="logo" src={`${logo}`}/>
                    <label className="gym-name">
                        {profile.gym_name},{profile.locality}
                    </label>

                    {editingLogo ?
                        <div className="pop-on-screen">
                            <ImageCrop
                                onSubmit={this.onLogoSubmit}
                                onCancel={this.onCancel}
                                image={this.state.uploadedLogo}
                                aspectRatio={1}
                                uploadImageToServer={updateLogo}
                            />
                        </div> : <div/>
                    }

                    <div className="edit-image-icon">
                        <label htmlFor="logo-upload">
                            <span className="glyphicon glyphicon-camera"/>
                        </label>
                        <UploadFile onUpload={this.onLogoUpload} field='logo-upload'/>
                    </div>
                </div>
                <div className="gym-info">
                    <div className='orange-header'>About</div>
                    {
                        !editingAbout ?
                            <div>
                                <a className="edit-icon-link pull-right" onClick={this.editAbout}>
                                    <span className="pull-right glyphicon glyphicon-edit">Edit</span>
                                </a>
                                <div className="field">{this.state.about} </div>
                            </div> :
                            <EditBox
                                onSubmit={this.onInfoSubmit}
                                onCancel={this.onCancel}
                                onChange={this.onChange}
                                field={'about'}
                                value={this.state.about}
                                isLoading={this.state.isLoading}/>
                    }

                    {/*<div className='orange-header'>Fee Structure</div>*/}
                    {/*{*/}
                    {/*!editingFeeStructure ?*/}
                    {/*<div>*/}
                    {/*<a className="edit-icon-link pull-right" onClick={this.editfeeStructure}>*/}
                    {/*<span className="pull-right glyphicon glyphicon-edit">Edit</span>*/}
                    {/*</a>*/}
                    {/*<div className="field">{this.state.feeStructure} </div>*/}
                    {/*</div> :*/}
                    {/*<EditBox*/}
                    {/*onSubmit={this.onInfoSubmit}*/}
                    {/*onCancel={this.onCancel}*/}
                    {/*onChange={this.onChange}*/}
                    {/*field={'feeStructure'}*/}
                    {/*value={this.state.feeStructure}*/}
                    {/*isLoading={this.state.isLoading}/>*/}
                    {/*}*/}
                    <DisplayGymAvgRating avgRatings={this.state.avgRating}/>

                    <div className="orange-header">Comments</div>
                    <DisplayReviews reviewList={this.state.reviews}/>
                </div>
            </div> : <Loading/>
    }
}

const mapStateToProps = (state) => ({
    gymId: state.selectedGym.gym_id
});

export default connect(mapStateToProps, null)(GymProfileInEditMode);