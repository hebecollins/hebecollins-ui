import React from 'react';
import FlashMessageList from './../../smart/commons/FlashMessageList';

/** Designs the navigation bar look
 * */
class NavigationBar extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a href="/" className="pull-left">
                                <img className="img-responsive2" src={require('../../../../images/HC_logo.png')}/>
                            </a>
                            <a href="#" className="navbar-brand">
                                {/*Hebecollins*/}
                            </a>
                            <button className="navbar-toggle" data-toggle="collapse" data-target=".navHeaderCollapse">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse navHeaderCollapse">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <div className="hebecollins-absolute">
                    <FlashMessageList/>
                </div>
            </div>
        );
    }
}

export default NavigationBar;