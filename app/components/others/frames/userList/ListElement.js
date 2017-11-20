import React from 'react'
import classnames from 'classnames'
import {getFormattedDate} from "../../../../Toolbox/Helpers/extra";

//
export const ListElement =
    ({
         index, nickName, imgThumb, name, onClick, isClicked, children
     }) => {
        const MOBILE_VISIBLE = "mobile-visible";
        const ALL_VISIBLE = "all-visible";
        const getComponent = (key) => {
            return children.filter((component) => {
                return component.key === key;
            });
        };

        return (
            <div>
                <a onClick={() => onClick(index)}
                   className={classnames("list-individual-data", {"list-individual-data-clicked": isClicked[index]})}>
                    <img className="list-thumbnail"
                         src={imgThumb}/>
                    <div className="list-individual-info">
                        <p className="list-individual-name"> {name}{` (${nickName})`}</p>
                        {getComponent(ALL_VISIBLE)}
                    </div>
                </a>
                <div>
                    {isClicked[index] ?
                        <div className="list-dropdown-mobile-visible">
                            {getComponent(MOBILE_VISIBLE)}
                        </div> :
                        <div/>
                    }
                </div>
            </div>
        )
    };

ListElement.propTypes = {
    nickName: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    imgThumb: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    isClicked: React.PropTypes.array.isRequired
};