import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({field, value,disabled, label, error, type, onChange, iconClass}) => {
    return (
        <div className={classnames('form-group', {'has-error': error})}>
            <div className="input-group">
                <span className="icon-text-field input-group-addon">
                    <b><b><i className={iconClass}/></b></b>
                </span>
                <input
                    value={value}
                    onChange={onChange}
                    type={type}
                    name={field}
                    className="form-control"
                    placeholder={label}
                    disabled={disabled}
                /></div>
            {error && <span className="help-block">{error}</span>}
        </div>
    )
};

TextFieldGroup.propTypes = {
    field: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;