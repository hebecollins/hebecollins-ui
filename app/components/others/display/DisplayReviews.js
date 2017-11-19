import React from 'react'
import Rate from "../extra/Rate";
import {getTrainerReviews} from "../../../actions/ratingActions";
import {getFormattedDate} from "../../../Toolbox/Helpers/extra";

class DisplayReviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
        };
    }

    componentWillMount() {
        getTrainerReviews('59e380f606358', '59eeef3689aa8').then(res => {
            const reviews = res.data.reviews;
            this.setState({reviews: reviews});
        })
    }


    render() {
        const reviewBox = this.state.reviews.map((review, index) => {
            return (
                <div key={review.reviewer_id} className="review-list">
                    <div className="average-rating">
                        <div className="star-box">
                            <Rate value={review.average} isSelectable={false} isAggregateRating={true}/>
                        </div>
                        <p className="rating-label">{review.reviewer_name}</p>
                    </div>
                    <div className="review-comment">
                        <p className="review-title">{review.title}</p>
                        <p className="review-description">{review.description}</p>
                        <div className="time-label">
                            <p className="rating-label">{getFormattedDate(review.updated_at)}</p>
                        </div>
                    </div>
                </div>
            )
        });

        return <div className="content">{reviewBox}</div>
    }
}

export default DisplayReviews;