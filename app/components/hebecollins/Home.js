import React from 'react';
import Navigation from "../common/Navigation";
import { Link } from 'react-router';

class Home extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
            //not signed in

            <Navigation>
                {/*<ul className="nav navbar-nav navbar-left">*/}
                {/*<li><Link to="/contact" className="navbar-brand">Contact Us</Link></li>*/}
                {/*</ul>*/}
            </Navigation>
                {this.state.loginFormDisabled?<LoginPage/>:<SignUpPage/>}
            //when signed in and is a client
            </div>
        )
    }
}

export default Home;
