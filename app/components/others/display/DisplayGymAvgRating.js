import React from 'react'
import isEmpty from 'lodash/isEmpty'

export const DisplayGymAvgRating = (props) => {

    const {avgRatings} = props;
    return (
        <div>
            <h1 className="orange-header">Ratings</h1>
            {!isEmpty(avgRatings)? <div>
                <label className="field">
                    Based on {avgRatings.reviewer_count} Ratings:
                </label>
                <div>
                    <label className="quality-name">Trainer's Quality : </label>
                    <label className="rating-in-number">{parseFloat(avgRatings.quality_one).toFixed(1)} / 5</label>
                </div>
                <div>
                    <label className="quality-name">Infrastructure : </label>
                    <label className="rating-in-number">{parseFloat(avgRatings.quality_two).toFixed(1)} / 5</label>
                </div>
                <div>
                    <label className="quality-name">Value For Money : </label>
                    <label className="rating-in-number">{parseFloat(avgRatings.quality_three).toFixed(1)} / 5</label>
                </div>
                <div>
                    <label className="quality-name">Equipment Availability : </label>
                    <label className="rating-in-number">{parseFloat(avgRatings.quality_four).toFixed(1)} / 5</label>
                </div>
                <div>
                    <label className="quality-name">Workout Environment : </label>
                    <label className="rating-in-number">{parseFloat(avgRatings.quality_five).toFixed(1)} / 5</label>
                </div>
                <hr/>
                <div>
                    <label className="quality-name big">Overall Rating : </label>
                    <label className="rating-in-number">{parseFloat(avgRatings.average).toFixed(1)} / 5</label>
                </div><hr/>
            </div> : <div className="white-center">NO REVIEWS YET</div>
            }
        </div>
    )
};

DisplayGymAvgRating.propTypes = {
    avgRatings: React.PropTypes.object.isRequired,
};