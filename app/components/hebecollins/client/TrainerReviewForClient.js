import React from 'react'
import {getTrainerReviews, postTrainerReview} from "../../../actions/ratingActions";
import {Loading} from "../../others/extra/Loading";
import {DisplayTrainerAvgReview} from "../../others/display/DisplayTrainerAvgRating";
import {DisplayReviews} from "../../others/display/DisplayReviews";
import {ButtonOrange} from "../../others/display/Buttons";
import RatingForm from "../../others/inputFieldGroup/RatingForm";
import {connect} from 'react-redux'

class TrainerReviewForClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avgRatings: {},
            reviewList: [],
            isReviewing: false,
            hasServerResponded:false
        };
        this.onReview = this.onReview.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onReviewSubmit = this.onReviewSubmit.bind(this);
    }

    componentWillMount() {
        this.setState({hasServerResponded:false});
        getTrainerReviews('59e380f606358', '59eeef3689aa8').then(res => {
                const avgRatings = res.data.avg_rating;
                const reviewList = res.data.reviews;
                this.setState({avgRatings: avgRatings, reviewList: reviewList, hasServerResponded:true});
            }
        )
    }

    onReview() {
        this.setState({isReviewing: true});
    }

    onReviewSubmit(data) {
        this.props.postTrainerReview(data,'59e380f606358','59eeef3689aa8').then(res=>{
            this.componentWillMount();
            this.setState({isReviewing: false});
        })
    }

    onCancel(){
        this.setState({isReviewing: false});
    }

    render() {
        const {avgRatings, reviewList, isReviewing, hasServerResponded} = this.state;

        return (
            hasServerResponded ?
                <div>
                    <div className="content">
                        <div className="black-box">
                            <DisplayTrainerAvgReview avgRatings={avgRatings}/>
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
                        <div id="pop-on-screen">
                            <RatingForm
                            onSubmit={this.onReviewSubmit}
                            onCancel={this.onCancel}
                            postTrainerReview={this.props.postTrainerReview}/>
                        </div>: <div/>
                    }
                </div>
                : <Loading/>
        )
    }
}

export default connect(null, {postTrainerReview})(TrainerReviewForClient);