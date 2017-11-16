import React from 'react';
import {getNotifications} from "../../../actions/notificationActions";

/** Designs the navigation bar look
 * */
class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications:[]
        }
    }


    componentWillMount() {
       getNotifications().then(res=>{
           this.setState({notifications:res.data.notifications})
       })
    }

    render() {

        let notifBox  = this.state.notifications.map((notif, index)=>{
           return <div key={index} className="notif-box">
               {notif.notification}{notif.created_at}
               </div>
        });

        return (
            <div className="notif-container">
                {notifBox}
            </div>
        )
    };
}

export default Notification;