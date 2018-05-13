import React from 'react';

/**Defines a Box on a page in which a styling is set. Only things required to pass is the fields
 * and the onSubmit function
 *
 * Purpose: To use it on pages with a form and no fancy stuff. Eg OTP Form *
 *
 * Buttons:
 *      *Submit button : Submit button appears at the center of the page.
 *                  No need to pass as props
 * */
export const FormatForm = (props) => {

    const submitBtn =
        <button disabled={props.isLoading}
                className="btn btn-group-justified btn-hebecollins btn-lg">
            {props.submitLabel}
        </button>;

    return (
        <div>
            <div className="icon-center">
                <i className={props.iconClass} aria-hidden="true"/>
            </div>
            <form className="form-hebecollins" onSubmit={props.onSubmit}>
                <br/><p className="white-center">{props.instruction}</p>
                {props.children}
                {props.submitButton ?
                    submitBtn : <p></p>
                }
            </form>
        </div>
    )
};

FormatForm.propTypes = {
    instruction: React.PropTypes.string.isRequired,
    submitLabel: React.PropTypes.string.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
    iconClass: React.PropTypes.string.isRequired,
    submitButton: React.PropTypes.bool.isRequired
};

FormatForm.defaultProps = {
    submitLabel: "Submit",
    submitButton: true
};