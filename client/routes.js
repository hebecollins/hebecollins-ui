import React from 'react';
import {Route, IndexRoute} from 'react-router';

import SignUpPage from './components/signup/SignUpPage';
import App from './components/App';
import Greetings from "./components/Greetings";

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Greetings}/>
        <Route path="signup" component={SignUpPage}/>
    </Route>
)//IndexRoute is default route.. when nothing else is called , it gets called