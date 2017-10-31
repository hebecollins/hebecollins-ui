import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export const Fade = (props) => {
    return (
        <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
            transitionAppear={true}
            transitionAppearTimeout={1000}
        >
            {props.children}
        </ReactCSSTransitionGroup>
    )
};


export const Slide = (props) => {
    return (
        <ReactCSSTransitionGroup
            transitionName="slide"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
            transitionAppear={true}
            transitionAppearTimeout={1000}
        >
            {props.children}
        </ReactCSSTransitionGroup>
    )
};