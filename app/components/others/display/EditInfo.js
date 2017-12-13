import React from 'react'
import {message} from "../../../Toolbox/Helpers/messages";
import {CommentBox, Select} from "../inputField/InputFieldWithIconAddOn";
import {ButtonOrange} from "./Buttons";

export const EditInfo = ({editingForm, isEditing, value, editingAction, label}) => {
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
    editingForm: React.PropTypes.any.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    editingAction: React.PropTypes.func.isRequired,
    isEditing: React.PropTypes.bool.isRequired
};

export const EditBox = ({onSubmit, onCancel, onChange, field, value, isLoading}) => {
    return <div className="edit-box">
        <CommentBox
            field={field}
            value={value}
            label={""}
            onChange={onChange}
            isIconNeeded={false}
        />
        <div className="edit-box-buttons">
            <ButtonOrange disabled={isLoading} label={"Done"} onClick={onSubmit}/>
            <ButtonOrange disabled={isLoading} label={"Cancel"} onClick={onCancel}/>
        </div>
    </div>
};

EditBox.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    field: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
};

export const EditOptions = ({onSubmit, onCancel, onChange, field, value, isLoading, children}) => {
    return <div className="edit-box">
        <Select
            field={field}
            value={value}
            label={"Select One Option"}
            onChange={onChange}
            isIconNeeded={false}
        >{children}</Select>
        <div className="edit-box-buttons">
            <ButtonOrange disabled={isLoading} label={"Done"} onClick={onSubmit}/>
            <ButtonOrange disabled={isLoading} label={"Cancel"} onClick={onCancel}/>
        </div>
    </div>
};

EditOptions.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    field: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
};