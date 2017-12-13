import React from 'react';
import {getNotifications, markNotificationAsRead} from "../../../actions/notificationActions";
import {getFormattedDate} from "../../../Toolbox/Helpers/extra";
import Scrollable from "../extra/Scrollable";
import {redirectByName} from "../../../Toolbox/Helpers/redirect";

/** Designs the navigation bar look
 * */
class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: []
        }
    }

    componentWillMount() {
        getNotifications().then(res => {
            const notifications = res.data.notifications;
            this.setState({notifications: notifications});
        })
    }

    componentWillUnmount() {

        const markedIdsAsRead = this.state.notifications.map((notification, index) => {
            return notification.id
        });
        markNotificationAsRead(markedIdsAsRead);
    }

    onClick(category) {
        if(category === "workout"){
            redirectByName("GET_WORKOUT_FOR_TODAY");
        }
        if(category === "client_account_activate"){
            redirectByName("CLIENT_LIST_FOR_TRAINERS");
        }
    }

    render() {
        let notifBox = this.state.notifications.map((notif, index) => {
            return (
                <button key={index} onClick={()=>this.onClick(notif.category)} className="notif-box notification-button">
                    <img className="notif-thumbnail" src={notif.img_thumb}/>
                    <div className="notif-notif">
                        <p>{notif.notification}</p>
                        <p><span
                            className="space-glyphicon glyphicon glyphicon-time"/>{getFormattedDate(notif.created_at)}
                        </p>

                    </div>
                </button>
            )
        });

        return (
                <div className="notif-container">
                    <p>Notifications</p>
                    <div className="notif-list">
                        <Scrollable>
                        {notifBox}
                    </Scrollable>
                    </div>
                </div>
        )
    };
}

export default Notification;