import React from 'react';
import {connect} from 'react-redux';
import FlashMessage from './FlashMessage';
import {deleteFlashMessage} from '../../../actions/flashMessageActions';

class FlashMessageList extends React.Component {
    render() {
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