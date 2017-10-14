import React from 'react';

/**Defines a Box on a page in which a styling is set. Only things required to pass is the fields
 * and the onSubmit function
 * =================================================================================
 * ++++ Purpose: To use it on pages with a form and no fancy stuff. Eg OTP Form ++++
 * ==================================================================================
 * */
export const FormatForm = (props) => {
    return (
        <div className="passwordRecover">
            <div className="col-lg-offset-3 col-lg-6 col-md-offset-3 col-md-6">
                <div className="hebecollins-content-child">
                    <img className="logo-extended" src={require('../../../../images/HC_logo_extended.jpg')}/>
                    <form className="form-hebecollins" onSubmit={props.onSubmit}>
                        <p className="white-center">{props.instruction}</p>
                        {props.children}
                        <div className="form-group">
                            <button disabled={props.isLoading} className="btn btn-group-justified btn-hebecollins btn-lg">
                                {props.submitLabel}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

FormatForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    instruction: React.PropTypes.string.isRequired,
    submitLabel: React.PropTypes.string.isRequired,
    isLoading: React.PropTypes.bool.isRequired
};

FormatForm.defaultProps={
  submitLabel:"Submit"
};