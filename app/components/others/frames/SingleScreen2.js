import React from 'react';

/**All single screen child don't have to do individual customisation for getting a white
 * box inside that. It is assumed that all single screen children will be simple forms.
 * */
class SingleScreen2 extends React.Component {
    render() {
        return (
            <div className="single-screen-2">
                {/*<div className="col-lg-offset-3 col-lg-6 col-md-offset-2 col-md-8 col-sm-offset-2 col-sm-8 col-xs-12">*/}
                    <div className="white-box">
                        {this.props.children}
                    </div>
                {/*</div>*/}
            </div>
        )
    }
}

export default SingleScreen2;