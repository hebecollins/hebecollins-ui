import React from 'react'
import {CommentBox} from "../inputField/InputFieldWithIcon";

/** Displays current remark with 'edit' option. Once edit button is clicked, it hides the text and throws
 * a textArea with 'Done'(Submit) button.
 * @param value => initial value for remark which is coming from the server
 * @param editRemarks => method which triggers hiding of text and 'edit' button once it is pressed
 * @param onChange => method which handles change in textArea
 * @param remarks => the state which is storing remarks current value
 * @param isEditing => true between edit button clicked and Done(Submit) button clicked
 * @param onSubmit => method which handles what happens once remark is submitted
 * @param isLoading => makes button disabled once submit button is pressed
 */
export const Remarks = ({value, editRemarks, onChange, remarks, onSubmit, isEditing, isLoading}) => {
    return (
        <div>
            <label className="field">Remarks: </label>
            <div className="value">
                {isEditing ?
                    <div className="remark-box">
                        <CommentBox
                            label={""}
                            field={"remarks"}
                            value={remarks}
                            isIconNeeded={false}
                            onChange={onChange}
                        />
                        <button
                            disabled={isLoading}
                            className="btn-hebecollins-orange pull-right"
                            onClick={onSubmit}>Done
                        </button>
                    </div>
                    :
                    <div>
                        <a className="edit-icon-link" onClick={editRemarks}>
                            <span className="pull-right glyphicon glyphicon-edit">edit</span>
                        </a>
                        {value}</div>
                }
            </div>

        </div>

    )
};

Remarks.propTypes = {
    value: React.PropTypes.string.isRequired,
    remarks: React.PropTypes.string.isRequired,
    isEditing: React.PropTypes.bool.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
    editRemarks: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
};