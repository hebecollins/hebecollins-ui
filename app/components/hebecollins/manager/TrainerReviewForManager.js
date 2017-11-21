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

class TrainerReviewForManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avgRatings: {},
            reviewList: [],
            hasServerResponded: false
        };
    }

    componentWillMount() {
        const {selectedUser, selectedGym} = this.props;
        if (isEmpty(selectedUser)) {
            redirectByName('TRAINER_LIST_FOR_MANAGER');
        } else {
            this.setState({hasServerResponded: false});
            getTrainerReviews(selectedGym.gym_id, selectedUser.trainer_id).then(res => {
                    const avgRatings = res.data.avg_rating;
                    const reviewList = res.data.reviews;
                    this.setState({avgRatings: avgRatings, reviewList: reviewList, hasServerResponded: true});
                }
            )
        }
    }

    render() {
        const {avgRatings, reviewList, isReviewing, hasServerResponded} = this.state;

        const noReviewsYet =
            <div className="no-reviews-yet">
                <h1 className="white-center">NO REVIEWS YET</h1>
            </div>;

        return (
            hasServerResponded ?
                !isEmpty(avgRatings) ?
                        <div className="content">
                            <div className="black-box">
                                <DisplayTrainerAvgReview avgRatings={avgRatings}/>
                                <div className="orange-header">Recent Reviews</div>
                                <DisplayReviews reviewList={reviewList}/>
                            </div>
                        </div>
                     :
                    <div className="pop-on-screen opaque">
                        {noReviewsYet}
                        <div className="pager">
                        <ButtonOrange
                            onClick={()=>redirectByName("TRAINER_LIST_FOR_MANAGER")}
                            disabled={false}
                            label={"Go Back"}/>
                        </div>
                    </div> : <Loading/>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedGym: state.selectedGym,
    selectedUser: state.selectedUser
});

export default connect(mapStateToProps, {postTrainerReview})(TrainerReviewForManager);