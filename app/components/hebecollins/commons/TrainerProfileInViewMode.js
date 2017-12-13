import React from 'react'
import {getProfileById} from "../../../actions/profileActions";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {Loading} from "../../others/extra/Loading";
import {BasicInfo, ContactInfo} from "../../others/display/ProfileInfo";
import {connect} from "react-redux"
import {message} from "../../../Toolbox/Helpers/messages";

class TrainerProfileInViewMode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            hasServerResponded: true
        };
    }

    componentWillMount() {
        this.setState({hasServerResponded: false});
        const {gymId, userId} = this.props;
        getProfileById(gymId, userId).then(res => {
            this.setState({
                info: res.data, hasServerResponded: true
            });
        }).catch(err => errorResponse(err));
    }

    render() {
        const {info, hasServerResponded} = this.state;

        return ( !hasServerResponded ? <Loading/> : <div className="content quote-box">
                <div className="black-box">
                    <div className="profile">
                        <div className="profile-pic-container">
                            <img className="profile-pic" src={info.profile_pic}/>
                        </div>

                        <div className="profile-data">
                            <BasicInfo
                                name={info.name}
                                nick_name={info.nick_name}
                                dob={info.dob}
                                gender={info.gender}
                                age={info.age}/>

                            <ContactInfo
                                email={info.email}
                                country_code={info.country_code}
                                mobile={info.mobile}
                            />

                            <div className="heading">Professional Information</div>

                            <div className="orange-field">
                                <h1 className="field">Experience : </h1>
                                <div className="flex">
                                    <h1 className="value">{info.experience?info.experience:message.notEntered}</h1>
                                </div>
                            </div>

                            <div className="orange-field">
                                <h1 className="field">Certifications : </h1>
                                <div className="flex">
                                    <h1 className="value">{info.certifications?info.certifications:message.notEntered}</h1>
                                </div>
                            </div>

                            <div className="orange-field">
                                <h1 className="field">Achievements : </h1>
                                <div className="flex">
                                    <h1 className="value">{info.achievements?info.achievements:message.notEntered}</h1>
                                </div>
                            </div>

                            <div className="orange-field">
                                <h1 className="field">Speciality : </h1>
                                <div className="flex">
                                    <h1 className="value">{info.speciality?info.speciality:message.notEntered}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    gymId: state.selectedGym.gym_id,
    userId: state.selectedUser.trainer_id
});

export default connect(mapStateToProps, null)(TrainerProfileInViewMode);