import React from 'react'
import ReactLoading from 'react-loading'

export const Loading = () => {
    return (
      <div className="loading-box">
          <ReactLoading className="loading" delay={0} type="spinningBubbles"/>
      </div>
    )
};