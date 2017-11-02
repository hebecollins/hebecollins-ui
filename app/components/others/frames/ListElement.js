import React from 'react'
import classnames from 'classnames'
import {getFormattedDate} from "../../../Toolbox/Helpers/extra";

export const ListElement =
    ({
         index, nick_name, img_thumb, first_name, middle_name, last_name, workout_update_date,
         joining_date, onClick, isClicked
     }) => {
        return (
            <a
                onClick={() => onClick(index)}
                className={classnames("list-individual-data", {"list-individual-data-clicked": isClicked[index]})}
                // className="list-individual-data"
            >
                <img className="list-thumbnail"
                     src={"data:image/png;base64," + img_thumb}/>
                <div className="list-individual-info">
                    <p className="list-individual-name"> {first_name + " " + middle_name + " " + last_name}
                        {` (${nick_name})`}</p>
                    <p className="list-individual-joining-date">joined on:{` ${getFormattedDate(joining_date)}`}</p>
                    <p className="list-individual-workout-date">
                        Workout updated on:{workout_update_date ? ` ${getFormattedDate(workout_update_date)}` : " not assigned"}
                    </p>
                </div>
            </a>
        )
    };

ListElement.propTypes = {
    nick_name: React.PropTypes.string.isRequired,
    first_name: React.PropTypes.string.isRequired,
    middle_name: React.PropTypes.string.isRequired,
    last_name: React.PropTypes.string.isRequired,
    img_thumb: React.PropTypes.string.isRequired,
    joining_date: React.PropTypes.string.isRequired,
    workout_update_date: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    isClicked: React.PropTypes.array.isRequired
};