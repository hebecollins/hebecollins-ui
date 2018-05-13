import React from 'react';
import {IMG_URL_OF} from "../../../../config/imageUrl";

/** Designs the navigation bar look
 * */
export const NavigationBar = (props) => {
    return (
        <div className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a href="/" className="pull-left">
                        <img className="img-responsive2" src={IMG_URL_OF.LOGO_SHORT}/>
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
                    {props.children}
                </div>
            </div>
        </div>
    );
};

