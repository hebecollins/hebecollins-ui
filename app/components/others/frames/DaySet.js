import React from 'react';
import {dayOfWeek} from "../../../Toolbox/Helpers/extra";

export const DaySet = ({onDayChange, dayIndex}) => {
    return (
        <div className="pager">
            <hr/>
            <a onClick={onDayChange} name="back" className="day-link pull-left">
                <span className="glyphicon glyphicon-triangle-left"/>
                {dayOfWeek(dayIndex - 1, true)}
            </a>
            <label className="day">{dayOfWeek(dayIndex, true)}</label>
            <a onClick={onDayChange} name="next" className="day-link pull-right">
                {dayOfWeek(dayIndex + 1, true)}
                <span className="glyphicon glyphicon-triangle-right"/></a>
            <hr/>
        </div>
    )
};

DaySet.propTypes = {
    onDayChange :React.PropTypes.func.isRequired,
    dayIndex :React.PropTypes.number.isRequired,
};