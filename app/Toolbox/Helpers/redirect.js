import React from 'react';
import {browserHistory} from 'react-router';

export  function redirect(route) {
    browserHistory.push(route);
}