import React from 'react'
import classnames from 'classnames'

export const FieldValue = ({field,value,noMargin}) => {
    return (
        <p className={classnames({"no-margin":noMargin})}>
            <label className="field">{`${field} :`}</label>
            <label className="value">{` ${value}`}</label>
        </p>
    )
};

FieldValue.propTypes={
    field: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    noMargin: React.PropTypes.bool.isRequired,
};

FieldValue.defaultProps={
    noMargin:false
}