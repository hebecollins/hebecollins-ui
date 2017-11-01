import React from 'react'
import {clientListForTrainer} from "../../../actions/userListActions";
import {connect} from "react-redux"
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import isEmpty from 'lodash/isEmpty'
import {ListElement} from "../../others/frames/ListElement";

class ClientList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: []
        }
    }

    componentWillMount() {
        const {user} = this.props;
        const gymId = user.gym_list[0].gym_id;
        clientListForTrainer(gymId).then(
            (res) => {
                this.setState({
                    clients: res.data.clients
                });
            }
        ).catch(err => {
                console.log(err)
                console.log("somehitng")
                errorResponse(err)
            }
        )
    }

    render() {
        const {clients} = this.state;
        console.log(clients);
//should be a box with input as img base64
        return (
            <div className="content">
                <div className="round-edged-box">
                    <p className="list-header">Client List</p>
                    {!isEmpty(clients)
                        ?
                        clients.map((client, index) =>
                        <ListElement
                            key={index}
                            nick_name={client.nick_name}
                            first_name={client.first_name}
                            middle_name={client.middle_name}
                            last_name={client.last_name}
                            img_thumb={client.img_thumb}
                            joining_date={client.joining_date}
                            workout_update_date={client.workout_update_date}
                        />
                        )
                        : <p> </p>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(ClientList);