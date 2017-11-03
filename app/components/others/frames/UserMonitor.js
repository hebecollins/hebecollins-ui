import React from 'react'

export const UserMonitor = (props) => {
    return (
        <div className="list-monitor">
            <p className="list-monitor-header">
                {props.firstName + " " + props.middleName
                + " " + props.lastName}
                {` (${props.nickName})`}
            </p>
            <div className="list-monitor-elements">
            {props.children}
            </div>
        </div>
    )
};

UserMonitor.propTypes={
  firstName:React.PropTypes.string.isRequired,
  middleName:React.PropTypes.string.isRequired,
  lastName:React.PropTypes.string.isRequired,
  nickName:React.PropTypes.string.isRequired
};