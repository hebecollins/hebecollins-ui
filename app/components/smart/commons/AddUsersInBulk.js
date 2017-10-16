// import React from 'react';
// import {validateUserRegistrationFields} from "../../../Toolbox/Validation/helpers";
// import AddUser from '../../dumb/commons/AddUser';
// import {addUserToDBAndStore} from "../../../actions/commons/addUser"
// import {connect} from 'react-redux';
// import {FormatForm} from "../../dumb/commons/FormatForm";
//
// class AddUsersInBulk extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             nick_name: '',
//             email: '',
//             mobile: '',
//             country_code: '',
//             isMobileValid: '',
//             errors: {},
//             isLoading: false,
//             isSubmitted: false
//         };
//
//         this.onChange = this.onChange.bind(this);
//         this.submit = this.submit.bind(this);
//         this.addMore = this.addMore.bind(this);
//         this.handleMobileNo = this.handleMobileNo.bind(this);
//
//     }
//
//     onChange(e) {
//         this.setState({[e.target.name]: e.target.value});
//     }
//
//     isValid() {
//         const {errors, isValid} = validateUserRegistrationFields(this.state);
//         if (!isValid) {
//             this.setState({errors});
//         }
//         return isValid;
//     }
//
//     handleMobileNo(status, value, countryData, number) {
//         this.setState({mobile: value, country_code: countryData.dialCode, isMobileValid: status})
//     }
//
//     addMore(e) {
//         if (this.isValid()) {
//             this.setState({errors: {}, isLoading: true});
//             this.props.addUserToDBAndStore(this.state, 'trainer');
//             this.setState({
//                 nick_name: '',
//                 email: '',
//                 mobile: '',
//                 country_code: '',
//                 isMobileValid: '',
//                 errors: {},
//                 isLoading: false
//             })
//         }
//     }
//
//     onSubmit(e) {
//         this.setState({isSubmitted: true});
//         this.addMore();
//         // e.preventDefault();
//         // if (this.isValid()) {
//         //     this.setState({errors: {}, isLoading: true});//setting state to empty
//         //     this.props.userSignUpRequest(this.state).catch(
//         //         (err) => {
//         //             const response = errorResponse(err);
//         //             this.setState({errors: response, isLoading: false})
//         //         }
//         //     )
//         // }
//     }
//
//     render() {
//         return (
//             <FormatForm
//                 onSubmit={this.onSubmit}
//                 instruction=""
//                 submitLabel=""
//                 isLoading={}
//                 enableImage={}
//                 backButton={}
//                 nextButton={}
//                 submitButton={}>
//                 <AddUser
//                     onChange={this.onChange}
//                     handleMobileNo={this.handleMobileNo}
//                     state={this.state}/>
//                 {/*<div className="btn-group btn-group-justified">*/}
//                     {/*<a className="btn btn-hebecollins btn-lg"*/}
//                        {/*name="login" onClick={this.addMore}*/}
//                        {/*disabled={this.state.isLoading}>Add More</a>*/}
//                     {/*<a className="btn btn-hebecollins btn-lg"*/}
//                        {/*name="signup" onClick={this.submit}*/}
//                        {/*disabled={this.state.signupFormDisabled}>Done</a>*/}
//                 {/*</div>*/}
//             </FormatForm>
//         );
//     }
// }
//
// AddUsersInBulk.propTypes = {
//     addUserToDBAndStore: React.PropTypes.func.isRequired
// };
//
// export default connect(null, {addUserToDBAndStore})(AddUsersInBulk);