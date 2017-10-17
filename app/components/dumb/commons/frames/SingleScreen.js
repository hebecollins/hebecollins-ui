import React from 'react';

/**All single screen child don't have to do individual customisation for getting a white
 * box inside that. It is assumed that all single screen children will be simple forms.
 * */
class SingleScreen extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-lg-offset-3 col-lg-6 col-md-offset-3 col-md-6 col-sm-offset-3 col-sm-6 col-xs-12">
                    <div className="content-child-single-screen">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleScreen;