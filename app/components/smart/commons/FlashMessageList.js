import React from 'react';
import {connect} from 'react-redux';
import FlashMessage from '../../dumb/commons/FlashMessage';
import {deleteFlashMessage} from '../../../actions/commons/flashMessages';

class FlashMessageList extends React.Component {
    render() {
        console.log("FlashMessageList");
        const {deleteFlashMessage}=this.props;
        const messages = this.props.messages.map(message =>
            <FlashMessage key={message.id} message={message} deleteFlashMessage={deleteFlashMessage}/>
        );
        return (
            <div>
                {messages}
            </div>
        );
    }
}

FlashMessageList.propTypes = {
    messages: React.PropTypes.array.isRequired,
    deleteFlashMessage: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        messages: state.flashMessages
    }
}

export default connect(mapStateToProps,{deleteFlashMessage})(FlashMessageList);