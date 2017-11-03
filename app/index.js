import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import routes from './routes';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';
import setAuthToken from "./Toolbox/Auth/SetAuthToken";
import {saveSelectedGym, saveSelectedUser, setCurrentUser} from "./actions/actionStore";

const store = createStore(
    // (state = {})=> state,//empty reducer
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

/*copies currentUser details from local storage to redux store*/
if (localStorage.user) {
    const user = JSON.parse(localStorage.user);
    setAuthToken(user.token);
    store.dispatch(setCurrentUser(user))
}

/*copies selectedGym details from local storage to redux store*/
if (localStorage.selectedGym) {
    const gym = JSON.parse(localStorage.selectedGym);
    store.dispatch(saveSelectedGym(gym))
}

/*copies selectedUser details from local storage to redux store*/
if (localStorage.selectedUser) {
    const selectedUser= JSON.parse(localStorage.selectedUser);
    store.dispatch(saveSelectedUser(selectedUser))
}


render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>
    , document.getElementById('app'))

export {store};