import React from 'react';
import {browserHistory} from 'react-router';
import {getRouteByName} from "./routeHandler"

export  function redirectTo(route) {
    browserHistory.push(route);
}

export function redirectToHome() {
    browserHistory.push(getRouteByName('HOME'));
}

export function redirectByName(name) {
    const route = getRouteByName(name);
    browserHistory.push(route);
}