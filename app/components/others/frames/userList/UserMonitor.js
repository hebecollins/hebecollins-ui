import React from 'react'

export const UserMonitor = ({firstName, middleName, lastName, nickName, children}) => {

    const LEFT_BOX = "left-box";
    const RIGHT_BOX = "right-box";
    const getComponent = (key) => {
        return children.filter((component) => {
            return component.key === key;
        });
    };


    return (
        <div className="list-monitor">
            <p className="list-monitor-header">
                {firstName + " " + middleName + " " + lastName +` (${nickName})`}
            </p>
            <div className="list-monitor-elements">
                <div className="list-monitor-left-box">
                    {getComponent(LEFT_BOX)}
                </div>
                <div className="list-monitor-right-box">
                    {getComponent(RIGHT_BOX)}
                </div>
            </div>
        </div>
    )
};

UserMonitor.propTypes = {
    firstName: React.PropTypes.string.isRequired,
    middleName: React.PropTypes.string.isRequired,
    lastName: React.PropTypes.string.isRequired,
    nickName: React.PropTypes.string.isRequired
};