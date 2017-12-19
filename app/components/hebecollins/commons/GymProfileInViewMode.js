import React from 'react'
import {getGymProfile, gymRatings} from "../../../actions/gymActions";
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty'
import {Loading} from "../../others/extra/Loading";
import {DisplayGymAvgRating} from "../../others/display/DisplayGymAvgRating";
import {DisplayReviews} from "../../others/display/DisplayReviews";
import RatingForm from "../../others/inputFieldGroup/RatingForm";
import {ButtonOrange} from "../../others/display/Buttons";
import {postGymReview} from "../../../actions/gymActions";

class GymProfileInViewMode extends React.Component {
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

            isReviewing: '',

            avgRating: {},
            reviews: [],
            isLoading: false,
        };
        this.onCancel = this.onCancel.bind(this);
        this.onReviewSubmit = this.onReviewSubmit.bind(this);
        this.onReview = this.onReview.bind(this);
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

    onCancel() {
        this.setState({isReviewing: false})
    }

    onReviewSubmit(data) {
        this.props.postGymReview(this.props.gymId, data).then(res => {
            this.componentWillMount();
            this.setState({isReviewing: false});
        });
    }


    onReview() {
        this.setState({isReviewing: true})
    }

    render() {
        const {
            profile, coverPhoto, logo, operatingDays, operatingHours
        } = this.state;

        return !isEmpty(profile) ?
            <div className="content black-box">
                <div className="cover-photo-container">
                    <img className="cover-photo" src={`${coverPhoto}`}/>
                </div>
                <div className="logo-container">
                    <img className="logo" src={`${logo}`}/>
                    <label className="gym-name">
                        {profile.gym_name},{profile.locality}
                    </label>
                </div>


                <div className="gym-info">
                    <div className='orange-header'>About</div>
                    <div className="field">{this.state.about}</div>
                    <DisplayGymAvgRating avgRatings={this.state.avgRating}/>
                    {
                        this.props.isAuthenticated ?
                            <div>
                                <div className="write-review-box">
                                    <p className="field">Got an opinion ?</p>
                                    <ButtonOrange
                                        onClick={this.onReview}
                                        disabled={false}
                                        label={"Write a Review"}/>
                                </div>
                                {
                                    this.state.isReviewing ?
                                        <div className="pop-on-screen">
                                            <RatingForm
                                                onSubmit={this.onReviewSubmit}
                                                header={"Write a review"}
                                                onCancel={this.onCancel}
                                                qualityOne={"Trainer's Quality"}
                                                qualityTwo={"Infrastructure"}
                                                qualityThree={"Value For Money"}
                                                qualityFour={"Equipment Availability"}
                                                qualityFive={"Workout Environment"}
                                            />
                                        </div> :
                                        <div/>
                                }
                            </div>
                            : <div/>
                    }
                    <div className="orange-header">Comments</div>
                    <DisplayReviews reviewList={this.state.reviews}/>
                </div>
            </div> : <Loading/>
    }
}

const mapStateToProps = (state) => ({
    gymId: state.selectedGym.gym_id,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {postGymReview})(GymProfileInViewMode);