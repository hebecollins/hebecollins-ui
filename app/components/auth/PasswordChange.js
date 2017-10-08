// import React from 'react';
// import TextFieldGroup from '../common/TextFieldGroup'
// import validateInput from "../../Toolbox/Validation/category/login";
// import {connect} from 'react-redux';
// import {errorResponse} from "../../Toolbox/Helpers/responseHandler";
// import {passwordRecoverRequest} from "../../actions/authActions"
//
// class PasswordChange extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { inputs: ['input-0'] };
//     }
//
//     render() {
//         return(
//             <div>
//                 <form className="form-hebecollins">
//                     <div id="dynamicInput">
//                         {this.state.inputs.map(input => <input type="text" key={input} />)}
//                     </div>
//                 </form>
//                 <button onClick={ () => this.appendInput() }>
//                     CLICK ME TO ADD AN INPUT
//                 </button>
//             </div>
//         );
//     }
//
//     appendInput() {
//         console.log(this.state.inputs);
//         let newInput = `input-${this.state.inputs.length}`;
//         this.setState({ inputs: this.state.inputs.concat([newInput]) });
//     }
// }
//
// //
// // PasswordRecover.propTypes = {
// //     passwordRecoverRequest: React.PropTypes.func.isRequired
// // };
// //
// // export default connect(null, {passwordRecoverRequest})(PasswordRecover);
//
// export default PasswordChange;