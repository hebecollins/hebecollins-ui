import React from 'react';
import classnames from 'classnames';

/** It is an input text field component with text as add-on
 * */
export const TextField2 = ({field, value, disabled, label, error, type, onChange, iconClass, isIconNeeded}) => {
    console.log("error"+error);
    return (
        <FieldFrameWithTextAddOn
            label={label}
            error={error}
        >
            <input
                value={value}
                onChange={onChange}
                type={type}
                name={field}
                className="form-control"
                disabled={disabled}
            />
        </FieldFrameWithTextAddOn>
    )
};

TextField2.propTypes = {
    field: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
};

TextField2.defaultProps = {
    type: 'text',
};


/**============================================================================================
 * It is an multiple option field component. It accepts children.(brother of select)
 *  Usage:
 *         <Select>
 *                <option value=''>option field</option>
 *                <option value=''>option field</option>
 *         </Select>
 * */

export const Select2 = (props) => {
    const {field, label, error, onChange} = props;
    return (
        <FieldFrameWithTextAddOn
            label={label}
            error={error}
        >
            <select
                className="select form-control"
                onChange={onChange}
                name={field}>
                <option className="select-placeholder" disabled="disabled" selected="selected"> </option>
                {props.children}
            </select>
        </FieldFrameWithTextAddOn>
    )
};

Select2.propTypes = {
    field: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
};


/**============================================================================================
 * Provides frame for every input field in this file with addon as text
 *  Roles:
 *      * validation error at the bottom of input field
 *      * IF(isIconNeeded) icon display at the left of input field
 *        ELSE plain field
 * */

const FieldFrameWithTextAddOn = (props) => {
    const {error, label} = props;
    return (
        <div className={classnames('form-group', {'has-error': error})}>
            <div className="input-group">
                <span className="text-field input-group-addon">
                    {label}
                </span>
                {props.children}</div>
            {error && <span className="help-block">{error}</span>}
        </div>
    )
};

FieldFrameWithTextAddOn.propTypes = {
    error: React.PropTypes.string,
    label: React.PropTypes.string.isRequired
};