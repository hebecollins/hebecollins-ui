import React from 'react'
import {message} from "../../../Toolbox/Helpers/messages";

export const EditInfo = ({editingForm, isEditing, value, editingAction, label}) =>{
    return <div className="orange-field">
        <h1 className="field">{label} : </h1>
        {isEditing ? editingForm :
            <div className="flex">
                <h1 className="value">{value ? value : message.notEntered}</h1>
                <a className="edit-icon-link pull-right" onClick={editingAction}>
                    <span className="pull-right glyphicon glyphicon-edit">Edit</span>
                </a>
            </div>
        }
    </div>
};

EditInfo.propTypes = {
    editingForm : React.PropTypes.any.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    editingAction: React.PropTypes.func.isRequired,
    isEditing: React.PropTypes.bool.isRequired
};