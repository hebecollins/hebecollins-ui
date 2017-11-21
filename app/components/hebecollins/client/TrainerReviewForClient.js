import React from 'react'
import {getTrainerReviews, postTrainerReview} from "../../../actions/ratingActions";
import {Loading} from "../../others/extra/Loading";
import {DisplayTrainerAvgReview} from "../../others/display/DisplayTrainerAvgRating";
import {DisplayReviews} from "../../others/display/DisplayReviews";
import {ButtonOrange} from "../../others/display/Buttons";
import RatingForm from "../../others/inputFieldGroup/RatingForm";
import {connect} from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import {redirectByName} from "../../../Toolbox/Helpers/redirect";
import {deleteSelectedUserFromRedux} from "../../../actions/userListActions";

class TrainerReviewForClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avgRatings: {},
            reviewList: [],
            isReviewing: false,
            hasServerResponded: false
        };
        this.onReview = this.onReview.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onReviewSubmit = this.onReviewSubmit.bind(this);
    }

    componentWillMount() {
        const {selectedUser, selectedGym} = this.props;
        if (isEmpty(selectedUser)) {
            redirectByName('TRAINER_LIST_FOR_CLIENT');
        } else {
            this.setState({hasServerResponded: false});
            getTrainerReviews(selectedGym.gym_id, selectedUser.trainer_id).then(res => {
                    const avgRatings = res.data.avg_rating;
                    const reviewList = res.data.reviews;

                    this.setState({
                        avgRatings: avgRatings,
                        reviewList: reviewList,
                        hasServerResponded: true
                    });
                }
            )
        }
    }

    componentWillUnmount(){
        this.props.deleteSelectedUserFromRedux();
    }

    onReview() {
        this.setState({isReviewing: true});
    }

    onReviewSubmit(data) {
        const {selectedGym, selectedUser} = this.props;
        this.props.postTrainerReview(data, selectedGym.gym_id, selectedUser.trainer_id).then(res => {
            this.componentWillMount();
            this.setState({isReviewing: false});
        })
    }

    onCancel() {
        this.setState({isReviewing: false});
    }


    render() {
        const {avgRatings, reviewList,isReviewing, hasServerResponded} = this.state;

        return (
            hasServerResponded ?
                !isEmpty(avgRatings) ?
                    <div>
                        <div className="content">
                            <div className="black-box">
                                <DisplayTrainerAvgReview
                                    avgRatings={avgRatings}
                                    selectedGym={this.props.selectedGym}
                                    selectedUser={this.props.selectedUser}/>
                                <div className="write-review-box">
                                    <p className="field">Got an opinion ?</p>
                                    <ButtonOrange
                                        onClick={this.onReview}
                                        disabled={false}
                                        label={"Write a Review"}/>
                                </div>
                                <div className="orange-header">Recent Reviews</div>
                                <DisplayReviews reviewList={reviewList}/>
                            </div>
                        </div>
                        {isReviewing ?
                            <div className="pop-on-screen">
                                <RatingForm
                                    onSubmit={this.onReviewSubmit}
                                    header={"Write a review"}
                                    onCancel={this.onCancel}
                                    postTrainerReview={this.props.postTrainerReview}/>
                            </div> : <div/>
                        }
                    </div> :
                    <div className="pop-on-screen opaque">
                        <RatingForm
                            onSubmit={this.onReviewSubmit}
                            onCancel={() => redirectByName("TRAINER_LIST_FOR_CLIENT")}
                            header={"Be the first one to write a review"}
                            postTrainerReview={this.props.postTrainerReview}
                        />
                    </div> : <Loading/>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedGym: state.selectedGym,
    selectedUser: state.selectedUser
});

const mapDispatchToProps = {postTrainerReview, deleteSelectedUserFromRedux};

export default connect(mapStateToProps, mapDispatchToProps)(TrainerReviewForClient);