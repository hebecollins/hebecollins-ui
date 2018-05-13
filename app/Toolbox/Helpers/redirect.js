import React from 'react';
import {browserHistory} from 'react-router';
import {getRouteByName} from "./routeHandler"

export  function redirectTo(route) {
    browserHistory.push(route);
}

export function redirectToHome() {
console.log("redirecting to home");
    browserHistory.push(getRouteByName('HOME'));
}

export function redirectByName(name) {
    console.log("redirectByName");
    console.log("name  :"+name);
    const route = getRouteByName(name);
console.log("route  :"+route);
    browserHistory.push(route);
}