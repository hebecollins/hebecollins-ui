import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import {Router, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';
import setAuthToken from "./Toolbox/Auth/SetAuthToken";
import {setCurrentUser} from "./actions/loginActions";

const store = createStore(
    // (state = {})=> state,//empty reducer
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

if(localStorage.token){
    setAuthToken(localStorage.token);
    store.dispatch(setCurrentUser(localStorage.token))
}

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>, document.getElementById('app'))