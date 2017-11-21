import React from 'react'
import Rate from "../extra/Rate";

export const DisplayTrainerAvgReview = (props) => {

    const {avgRatings, selectedUser, selectedGym} = props;
    return (
        <div>
            <h1 className="orange-header no-bottom-padding">Reviews</h1>
            <hr/>
            <div className="rating-overall">
                <div className="review-trainer-detail">
                    <img className="thumbnail-big"
                         src="data:image/png;base64,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"/>
                    <div className="performance-detail-box">
                        <p className="field large">{selectedUser.name}</p>
                        <div className="star-box">
                            <Rate value={avgRatings.average} isAggregateRating={true} isSelectable={false}/>
                        </div>
                        <p className="field">Ranked <label className="rank">#{selectedUser.rank}</label></p>
                        <p className="field">@ {selectedGym.gym_name},{selectedGym.locality}</p>
                    </div>
                </div>
                <div className="rating-summary">
                    <label className="orange-header">
                        Based on {avgRatings.reviewer_count} Ratings:
                    </label>
                    <div>
                        <label className="quality-name">Quality One : </label>
                        <label className="rating-in-number">{parseFloat(avgRatings.quality_one).toFixed(1)} / 5</label>
                    </div>
                    <div>
                        <label className="quality-name">Quality Two : </label>
                        <label className="rating-in-number">{parseFloat(avgRatings.quality_two).toFixed(1)} / 5</label>
                    </div>
                    <div>
                        <label className="quality-name">Quality Three : </label>
                        <label className="rating-in-number">{parseFloat(avgRatings.quality_three).toFixed(1)} / 5</label>
                    </div>
                    <div>
                        <label className="quality-name">Quality Four : </label>
                        <label className="rating-in-number">{parseFloat(avgRatings.quality_four).toFixed(1)} / 5</label>
                    </div>
                    <div>
                        <label className="quality-name">Quality Five : </label>
                        <label className="rating-in-number">{parseFloat(avgRatings.quality_five).toFixed(1)} / 5</label>
                    </div>
                    <hr/>
                    <div>
                        <label className="quality-name big">Overall Rating : </label>
                        <label className="rating-in-number">{parseFloat(avgRatings.average).toFixed(1)} / 5</label>
                    </div>
                </div>
            </div>
        </div>
    )
};

DisplayTrainerAvgReview.propTypes = {
    avgRatings: React.PropTypes.object.isRequired,
    selectedGym: React.PropTypes.object.isRequired,
    selectedUser: React.PropTypes.object.isRequired,

};

