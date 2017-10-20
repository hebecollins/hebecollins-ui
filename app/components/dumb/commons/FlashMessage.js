import React from 'react';

/**mounts a component and then deletes it after 10 seconds
 * */
class FlashMessage extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.deleteFlashMessage(this.props.message.id)
    }

    componentDidMount() {
        let self = this;
        setTimeout(function () {
            self.onClick();
        }, 10000);
    }

    render() {
        const {id, type, text} = this.props.message;
        return (
            <div>
                {(type === 'error') ?
                    <div className='alert alert-danger'>
                        <button onClick={this.onClick} className="close"><span>&times;</span></button>
                        <span className="glyphicon glyphicon-exclamation-sign">
                        {/* ' ' is for adding a space between the message and the icon*/}
                        </span>{' '+ text}</div> :
                    <div className='alert alert-success'>
                        <button onClick={this.onClick} className="close"><span>&times;</span></button>
                        <span className="glyphicon glyphicon-ok-sign">
                        {/* ' ' is for adding a space between the message and the icon*/}
                        </span>{' '+ text}</div>
                }
            </div>

        )
    }
}

FlashMessage.propTypes = {
    message: React.PropTypes.object.isRequired,
    deleteFlashMessage: React.PropTypes.func.isRequired
};

export default FlashMessage;