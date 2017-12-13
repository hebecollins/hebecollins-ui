import React from 'react'
import {getFormattedDate, getGenderFromGenderCode} from "../../../Toolbox/Helpers/extra";

export const BasicInfo =({name, nick_name, gender, age, dob})=>{
    return <div>
        <div className="heading">Basic Information</div>
        <div className="flex">
            <h1 className="field">Full Name : </h1>
            <h1 className="value">{name}</h1>
        </div>

        <div className="flex">
            <h1 className="field">Nick Name : </h1>
            <h1 className="value">{nick_name}</h1>
        </div>
        <div className="flex">
            <h1 className="field">Gender : </h1>
            <h1 className="value">{getGenderFromGenderCode(gender)}</h1>
        </div>
        <div className="flex">
            <h1 className="field">Age : </h1>
            <h1 className="value">{age}</h1>
        </div>
        <div className="flex">
            <h1 className="field">Birthday : </h1>
            <h1 className="value">{getFormattedDate(dob)}</h1>
        </div>
    </div>
};

BasicInfo.propTypes={
    name : React.PropTypes.string.isRequired,
    nick_name : React.PropTypes.string.isRequired,
    dob : React.PropTypes.string.isRequired,
    gender : React.PropTypes.string.isRequired,
    age : React.PropTypes.string.isRequired,
};

export const ContactInfo = ({email, country_code, mobile})=>{
    return <div>
        <div className="heading">Contact Information</div>
        <div className="flex">
            <h1 className="field">Email : </h1>
            <h1 className="value">{email}</h1>
        </div>
        <div className="flex">
            <h1 className="field">Mobile : </h1>
            <h1 className="value">{`+${country_code}-` + mobile}</h1>
        </div>
    </div>
};

ContactInfo.propTypes ={
  email : React.PropTypes.string.isRequired,
  country_code : React.PropTypes.string.isRequired,
  mobile : React.PropTypes.string.isRequired,
};