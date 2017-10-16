import React from 'react';
import {IMG_URL_OF} from "../../../../config/imageUrl";

/**Defines a Box on a page in which a styling is set. Only things required to pass is the fields
 * and the onSubmit function
 * ===========================================================================
 *  *Purpose: To use it on pages with a form and no fancy stuff. Eg OTP Form *
 * ===========================================================================
 *
 * Buttons:
 *      *Next button : If wanted a Next button to appear on right side of the screen,
 *                  pass nextButton=true as props
 *      *Back button : If wanted a Back button to appear on left side of the screen,
 *                  pass backButton=true as props
 *      *Submit button : Submit button appears at the center of the page.
 *                  No need to pass as props
 * */
export const FormatForm = (props) => {
    const nextBtn =
        <button disabled={props.isLoading} onClick={props.onNextButtonClick}
                className="btn btn-hebecollins-next btn-lg">
            Next
            <span className="glyphicon glyphicon-chevron-right"
                  aria-hidden="true"> </span>
        </button>;

    const backBtn =
        <button disabled={props.isLoading} onClick={props.onBackButtonClick}
                className="btn btn-hebecollins-back btn-lg">
                                            <span className="glyphicon glyphicon-chevron-left"
                                                  aria-hidden="true"> </span>
            Back
        </button>;

    const submitBtn =
        <button disabled={props.isLoading}
                className="btn btn-group-justified btn-hebecollins btn-lg">
            {props.submitLabel}
        </button>;

    return (
        <div className="row">
            <div className="col-lg-offset-3 col-lg-6 col-md-offset-3 col-md-6">
                <div className="hebecollins-content-child">
                    {props.enableImage ?
                        <img className="logo-extended" src={IMG_URL_OF.LOGO_EXTENDED}/>
                        : <div></div>
                    }
                    <form className="form-hebecollins" onSubmit={props.onSubmit}>
                        <p className="white-center">{props.instruction}</p>
                        {props.children}
                        <div className="form-group">
                            {props.submitButton ?
                                submitBtn : <div></div>
                            }
                        </div>
                    </form>
                    {props.nextButton ?
                        nextBtn : <div></div>
                    }

                    {props.backButton ?
                        backBtn : <div></div>
                    }


                </div>
            </div>
        </div>
    )
};

FormatForm.propTypes = {
    instruction: React.PropTypes.string.isRequired,
    submitLabel: React.PropTypes.string.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
    enableImage: React.PropTypes.bool.isRequired,
    backButton: React.PropTypes.bool.isRequired,
    nextButton: React.PropTypes.bool.isRequired,
    submitButton: React.PropTypes.bool.isRequired
};

FormatForm.defaultProps = {
    submitLabel: "Submit",
    enableImage: true,
    backButton: false,
    nextButton: false,
    submitButton: true
};