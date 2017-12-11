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
                         src={selectedUser.img_thumb}/>
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

