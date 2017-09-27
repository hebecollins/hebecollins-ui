import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';

class SignUpForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            email:'',
            password:'',
            passwordConfirm:'',
            timezone:'',
            errors:{},
            isLoading:false
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
        this.setState({ errors:{},isLoading:true });//setting state to empty
        this.props.userSignUpRequest(this.state).then(
            ()=>{},
            ({ data })=>
                this.setState({ errors: data, isLoading:false })
        );
    }

    render() {

        const { errors } = this.state;
        if(!errors.isEmpty)
        console.log(errors);
        // console.log(errors.passwordConfirm);

        const options = map(timezones, (val, key)=>
            <option value={val} key={val}>{key}</option>
        );
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join World's biggest gym colony</h1>
                <div className={classnames("form-group",{'has-error':errors.username})}>
                    <label className="control-label">Username</label>
                    <input
                        value={this.state.username}
                        onChange={this.onChange}
                        type="text"
                        name="username"
                        className="form-control"
                    />
                    {errors.username && <span className="help-block">{errors.username}</span>}
                </div>

                <div className={classnames("form-group",{'has-error':errors.email})}>
                    <label className="control-label">Email</label>
                    <input
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        name="email"
                        className="form-control"
                    />
                    {errors.email && <span className="help-block">{errors.email}</span>}

                </div>

                <div className={classnames("form-group",{'has-error':errors.password})}>
                    <label className="control-label">Password</label>
                    <input
                        value={this.state.password}
                        onChange={this.onChange}
                        type="password"
                        name="password"
                        className="form-control"
                    />
                    {errors.password && <span className="help-block">{errors.password}</span>}

                </div>

                <div className={classnames("form-group",{'has-error':errors.passwordConfirm})}>
                    <label className="control-label">Confirm Password</label>
                    <input
                        value={this.state.passwordConfirm}
                        onChange={this.onChange}
                        type="password"
                        name="passwordConfirm"
                        className="form-control"
                    />
                    {errors.passwordConfirm && <span className="help-block">{errors.passwordConfirm}</span>}

                </div>

                <div className={classnames("form-group",{'has-error':errors.timezone})}>
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
                    {errors.timezone && <span className="help-block">{errors.timezone}</span>}
                </div>

                <div className="form-group">
                    <button disabled={this.state.isLoading} className="btn btn-primary btn lg">
                        Sign up
                    </button>
                </div>
            </form>
        );
    }
}

SignUpForm.propTypes={
    userSignUpRequest: React.PropTypes.func.isRequired
};

export default SignUpForm;
