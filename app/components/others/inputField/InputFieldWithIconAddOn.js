import React from 'react';
import classnames from 'classnames';
import DateTime from 'react-datetime';

//mobile no. files
import IntlTelInput from 'react-intl-tel-input';
import 'file?name=libphonenumber.js!../../../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import './../../../../node_modules/react-intl-tel-input/dist/main.css';
import {scrollToError} from "../../../Toolbox/Helpers/extra";


/** It is an input text field component with icon as add-on
 * */
export const TextField = ({field, value, disabled, label, error, type, onChange, iconClass, isIconNeeded}) => {
    return (
        <FieldFrame
            iconClass={iconClass}
            error={error}
            isIconNeeded={isIconNeeded}
        >
            <input
                value={value}
                onChange={onChange}
                type={type}
                name={field}
                className="form-control"
                placeholder={label}
                disabled={disabled}
            /></FieldFrame>
    )
};

TextField.propTypes = {
    field: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    iconClass: React.PropTypes.string.isRequired,
    isIconNeeded: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired
};

TextField.defaultProps = {
    type: 'text',
    iconClass: "glyphicon glyphicon-user",
    isIconNeeded: true
};

/**===========================================================================================
 * It is a comment Box
 * */
export const CommentBox = ({field, value, disabled, label, error, onChange, iconClass, isIconNeeded}) => {
    return (
        <FieldFrame
            iconClass={iconClass}
            error={error}
            isIconNeeded={isIconNeeded}
        >
            <textarea
                value={value}
                onChange={onChange}
                name={field}
                className="form-control comment-box"
                placeholder={label}
                disabled={disabled}
            /></FieldFrame>
    )
};

CommentBox.propTypes = {
    field: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    iconClass: React.PropTypes.string.isRequired,
    isIconNeeded: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired
};

CommentBox.defaultProps = {
    iconClass: "glyphicon glyphicon-user",
    isIconNeeded: true
};


/**============================================================================================
 * It is a date picker component.
 * */
export const Date = ({value, label, error, onDateUpdate, iconClass, isIconNeeded}) => {
    return (
        <FieldFrame
            iconClass={iconClass}
            error={error}
            isIconNeeded={isIconNeeded}
        >
            <DateTime
                closeOnSelect={true}
                viewMode={'days'}
                timeFormat={false}
                inputProps={{placeholder: label}}
                isValidDate={isValidDate}
                value={value}
                onChange={onDateUpdate}
                name="dob"
                dateFormat="YYYY-MM-DD"
            />
        </FieldFrame>
    )
};


/** It blocks inputting the date which is newer than yesterday. It can be customised to
 *  block date range
 * */
function isValidDate(current) {
    let yesterday = DateTime.moment().subtract(1, 'day');
    return current.isBefore(yesterday);
}

Date.propTypes = {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    iconClass: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    isIconNeeded: React.PropTypes.bool,
    onDateUpdate: React.PropTypes.func.isRequired,
};

Date.defaultProps = {
    iconClass: "glyphicon glyphicon-calendar",
    isIconNeeded: true
};

/**============================================================================================
 * */
export const MobileNumber = (props) => {
    const {field, value, iconClass, handleMobileNo, label, error, isIconNeeded} = props;
    return (
        <FieldFrame
            iconClass={iconClass}
            error={error}
            isIconNeeded={isIconNeeded}
        >
            <IntlTelInput
                fieldName={field}
                value={value}
                onPhoneNumberChange={handleMobileNo}
                preferredCountries={['in']}
                placeholder={label}
                numberType="MOBILE"
                style={{width: '100%'}}
                css={['intl-tel-input', 'form-control']}
                utilsScript={'libphonenumber.js'}
            />
        </FieldFrame>
    );
};

MobileNumber.propTypes = {
    label: React.PropTypes.string,
    field: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    iconClass: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    isIconNeeded: React.PropTypes.bool,
    handleMobileNo: React.PropTypes.func.isRequired,
};

MobileNumber.defaultProps = {
    iconClass: "glyphicon glyphicon-phone",
    label: "Mobile Number",
    isIconNeeded: true
};

/**============================================================================================
 * It is an multiple option field component. It accepts children.
 *  Usage:
 *         <Select>
 *                <option value=''>option field</option>
 *                <option value=''>option field</option>
 *         </Select>
 * */

export const Select = (props) => {
    const {field, label, error, onChange, iconClass, isIconNeeded} = props;
    return (
        <FieldFrame
            iconClass={iconClass}
            error={error}
            isIconNeeded={isIconNeeded}
        >
            <select
                className="select form-control"
                onChange={onChange}
                name={field}>
                <option className="select-placeholder" disabled="disabled" selected="selected">{label}</option>
                {props.children}
            </select>
        </FieldFrame>
    )
};

Select.propTypes = {
    field: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    iconClass: React.PropTypes.string.isRequired,
    isIconNeeded: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired
};

Select.defaultProps = {
    iconClass: "glyphicon glyphicon-user",
    isIconNeeded: true
};

/**File upload input field
 * */

export const UploadFile = ({onUpload, field,error}) => {
    return (
        <FieldFrame
            iconClass={''}
            error={error}
            isIconNeeded={false}
        >
            <div className="upload-box">
                <input className="upload"
                       type="file" id={field}
                       onChange={(e) => onUpload(e)}
                />
            </div>
        </FieldFrame>
    )
};

UploadFile.propTypes = {
    onUpload: React.PropTypes.func.isRequired,
    field: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
};


/**============================================================================================
 * Provides frame for every input field in this file with add-on as icon
 *  Roles:
 *      * validation error at the bottom of input field
 *      * IF(isIconNeeded) icon display at the left of input field
 *        ELSE plain field
 * */

const FieldFrame = (props) => {
    const {error, iconClass} = props;
    return (
        <div>{props.isIconNeeded ?
            <div className={classnames('form-group', {'has-error': error})}>
                <div className="input-group">
                <span className="icon-text-field input-group-addon">
                    <b><b><i className={iconClass}/></b></b>
                </span>
                    {props.children}</div>
                {error && <span className="help-block">{error}</span>}
            </div> :
            <div className={classnames('form-group', {'has-error': error})}>
                {props.children}
                {error && <span className="help-block">{error}</span>}
            </div>}
        </div>
    )
};

FieldFrame.propTypes = {
    error: React.PropTypes.string,
    iconClass: React.PropTypes.string.isRequired,
    isIconNeeded: React.PropTypes.bool.isRequired
};

FieldFrame.defaultProps = {
    isIconNeeded: true
};

