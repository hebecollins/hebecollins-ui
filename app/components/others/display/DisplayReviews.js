import React from 'react'
import Rate from "../extra/Rate";
import {getFormattedDate} from "../../../Toolbox/Helpers/extra";
import isEmpty from 'lodash/isEmpty'

export const DisplayReviews =(props)=>{

        const reviewBox = !isEmpty(props.reviewList)? props.reviewList.map((review, index) => {
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
                    </div><hr/>
                </div>
            )
        }):<div/>;
        return <div>{reviewBox}</div>
    };

DisplayReviews.propTypes = {
    reviewList: React.PropTypes.array.isRequired
};
