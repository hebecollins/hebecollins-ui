import React from 'react'

export const ListElement = ({nick_name, img_thumb, first_name, middle_name, last_name, workout_update_date, joining_date}) => {
    return (
        <div className="list-individual-data">
            <img className="list-thumbnail"
                 src={"data:image/png;base64," + img_thumb}/>
            <div className="list-individual-info">
                <p className="list-individual-name"> {first_name + " " + middle_name + " " + last_name}
                    {` (${nick_name})`}</p>
                <p className="list-individual-joining-date">joined on:{joining_date}</p>
                <p className="list-individual-workout-date">Workout updated on:
                    {workout_update_date ? workout_update_date : " not assigned"}</p>
            </div>
        </div>
    )
};

ListElement.propTypes = {
    nick_name: React.PropTypes.string.isRequired,
    first_name: React.PropTypes.string.isRequired,
    middle_name: React.PropTypes.string.isRequired,
    last_name: React.PropTypes.string.isRequired,
    img_thumb: React.PropTypes.string.isRequired,
    joining_date: React.PropTypes.string.isRequired,
    workout_update_date: React.PropTypes.string.isRequired
};