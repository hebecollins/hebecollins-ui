import React from 'react';

class OneScreen extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-lg-offset-3 col-lg-6 col-md-offset-3 col-md-6">
                    <div className="content-child-one-screen">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default OneScreen;