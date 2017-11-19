import React from 'react'
import Rating from 'react-star-ratings'

const Rate =(props)=>{
        let {value, onChange,isSelectable, isAggregateRating} = props;
        return (
            <Rating
                rating={value}
                isSelectable={isSelectable}
                isAggregateRating={isAggregateRating}
                changeRating={onChange}
                numOfStars={5}
                starSelectingHoverColor={"yellow"}
                starRatedColor={"yellow"}
                starEmptyColor={"grey"}
                starSpacing="1px"
            />
        )
    };

Rate.propTypes = {
    value: React.PropTypes.number.isRequired,
    isSelectable: React.PropTypes.bool,
    isAggregateRating: React.PropTypes.bool,
    onChange: React.PropTypes.func,
};

Rate.defaultProps={
    isSelectable:true,
    isAggregateRating:false
};

export default Rate;