import React from 'react'

export const UserMonitor = ({name, nickName, children}) => {

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
                {name +` (${nickName})`}
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
    name: React.PropTypes.string.isRequired,
    nickName: React.PropTypes.string.isRequired
};