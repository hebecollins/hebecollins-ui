import React from 'react'
import ReactLoading from 'react-loading'

export const Loading = () => {
    return (
      <div className="loading-box">
          <ReactLoading className="loading" delay={0} type="spinningBubbles"/>
      </div>
    )
};

export const LoadingTransparent = () => {
    return (
      <div className="loading-box loading-transparent">
          <ReactLoading className="loading" delay={0} type="spinningBubbles"/>
      </div>
    )
};