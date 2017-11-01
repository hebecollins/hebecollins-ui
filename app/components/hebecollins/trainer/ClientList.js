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
            clients: [],
            index:0
        }
    }

    componentWillMount() {
        const {user} = this.props;
        const gymId = user.gym_list[0].gym_id;
        clientListForTrainer(gymId).then(
            (res) => {
                this.setState({
                    clients: res.data.clients,
                });
            }
        ).catch(err => {
                console.log(err)
                console.log("somehitng")
                errorResponse(err)
            }
        )
    }

    onClick(index) {
        this.setState({index:index})
    }

    render() {
        const {clients,index} = this.state;
        console.log(clients);
        return (
            <div className="content">
                <div className="row">
                    <div className="col col-lg-5 col-md-5 col-sm-5 col-xs-12 round-edged-box">
                        <p className="list-header">Client List</p>
                        {!isEmpty(clients)
                            ?
                            clients.map((client, key) =>
                                <ListElement
                                    key={key}
                                    index={key}
                                    nick_name={client.nick_name}
                                    first_name={client.first_name}
                                    middle_name={client.middle_name}
                                    last_name={client.last_name}
                                    img_thumb={client.img_thumb}
                                    joining_date={client.joining_date}
                                    workout_update_date={client.workout_update_date}
                                    onClick={this.onClick.bind(this)}
                                />
                            )
                            : <p></p>
                        }
                    </div>
                <div className="col-lg-7 col-md-7 col-sm-7 hidden-xs round-edged-box">
                    {!isEmpty(clients)
                        ?
                        <div>
                            <p className="list-monitor-name">
                                {clients[index].first_name + " " + clients[index].middle_name
                                + " " + clients[index].last_name}
                                {` (${clients[index].nick_name})`}</p>
                        </div>
                        : <p></p>
                    }
                </div>
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