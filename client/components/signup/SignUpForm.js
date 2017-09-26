import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';

class SignUpForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            email:'',
            password:'',
            passwordConfirm:'',
            timezone:''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //event handler
    onChange(e){
        this.setState({ [e.target.name]: e.target.value});
    }//this key word is refering to context of event not the component.. we gotta make it component

    onSubmit(e){
        e.preventDefault();//to avoid storing default value
        console.log(this.state);
    }

    render() {

        const options = map(timezones, (val, key)=>
            <option value={val} key={val}>{key}</option>
        );
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join World's biggest gym colony</h1>
                <div className="form-group">
                    <label className="control-label">Username</label>
                    <input
                        value={this.state.username}
                        onChange={this.onChange}
                        type="text"
                        name="username"
                        className="form-control"/>
                </div>

                <div className="form-group">
                    <label className="control-label">Email</label>
                    <input
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        name="email"
                        className="form-control"/>
                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input
                        value={this.state.password}
                        onChange={this.onChange}
                        type="password"
                        name="password"
                        className="form-control"/>
                </div>

                <div className="form-group">
                    <label className="control-label">Confirm Password</label>
                    <input
                        value={this.state.passwordConfirm}
                        onChange={this.onChange}
                        type="password"
                        name="passwordConfirm"
                        className="form-control"/>
                </div>

                <div className="form-group">
                    <label className="control-label">Timezone</label>
                    <select
                        value={this.state.timezone}
                        onChange={this.onChange}
                        name="timezone"
                        className="form-control"
                    >
                        <option value="" disabled>Choose Your Timezone</option>
                        {options}
                    </select>
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn lg">
                        Sign up
                    </button>
                </div>
            </form>
        );
    }
}

export default SignUpForm;
