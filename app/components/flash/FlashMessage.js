import React from 'react';
import classnames from 'classnames';

/**mounts a component and then deletes it after 5 seconds
 * */
class FlashMessage extends React.Component {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.props.deleteFlashMessage(this.props.message.id)
    }

    componentDidMount() {
        let self=this;
        setTimeout(function(){
            self.onClick();
        }, 5000);
    }

    render() {
        const {id, type, text} = this.props.message;
        return (
            <div className={classnames('alert',{
                'alert-success':type==="success",
                'alert-danger':type==='error'
            })}>
                <button onClick={this.onClick} className="close"><span>&times;</span></button>
                {text}
            </div>
        )
    }
}

// FlashMessage.propTypes = {
//     message: React.PropTypes.object.isRequired,
//     deleteFlashMessage: React.PropTypes.func.isRequired
// };

export default FlashMessage;
