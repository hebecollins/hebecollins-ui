import React from 'react';

class TwoScreen extends React.Component {
    constructor(props) {
        super(props);

        this.getComponent = this.getComponent.bind(this)
    }

    getComponent(key) {
        return this.props.children.filter((comp) => {
            return comp.key === key;
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col col-lg-6 col-md-6 col-sm-6 hidden-xs">
                    <div className="content-child-two-screen">
                        {this.getComponent('desktopOnly')}
                    </div>
                </div>
                <div className="col col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="content-child-two-screen">
                        {this.getComponent('mobileVisible')}
                    </div>
                </div>
            </div>
        );
    }
}

export default TwoScreen;