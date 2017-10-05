import React from 'react';
import {Route, IndexRoute} from 'react-router';

import ActivatePage from './components/manager/ActivatePage';
import App from './components/App';
import Home from './components/hebecollins/Home'
import Navigation from "./components/common/Navigation";

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        {/*<Route path="home" component={Home}/>*/}
        <Route path="activate-manager" component={ActivatePage}/>
        {/*<Route path="login" component={LoginPage}/>*/}
    </Route>
)