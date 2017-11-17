import {Scrollbars} from 'react-custom-scrollbars'
import React from 'react'

/**It is a customised scrollbar.
 */
export default class Scrollable extends React.Component {
    render() {
        return (
            <Scrollbars
                renderTrackVertical={props => <div {...props} className='scrollbar-track-vertical'/>}
                renderThumbVertical={props => <div {...props} className='scrollbar-thumb-vertical'/>}
                {...this.props}
                style={{
                    width: "auto",
                    height: "inherit",
                    color: "white",
                }}
                >

                {this.props.children}
            </Scrollbars>
        )
    }
};
