import React from 'react';
import Activate from './Activate';
import {connect} from 'react-redux';
import {addFlashMessage} from '../../actions/flashMessages';
import {activateManagerRequest} from "../../actions/manager/activate"

class ActivatePage extends React.Component {
    render() {
        const {activateManagerRequest, addFlashMessage} = this.props;
        const {params} = this.props.location.query;
        console.log(this.props.location.query);
        return (
            <div className="hebecollins-content-child">
                <Activate
                    params={this.props.location.query}
                    activateManagerRequest={activateManagerRequest}
                    addFlashMessage={addFlashMessage}/>
            </div>
        );
    }
}

ActivatePage.propTypes = {
    // params: React.PropTypes.object.isRequired,
    activateManagerRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
};

export default connect(null, {activateManagerRequest, addFlashMessage})(ActivatePage);
