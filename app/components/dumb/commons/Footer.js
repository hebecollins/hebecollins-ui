import React from 'react';
import {IMG_URL_OF} from "../../../../config/imageUrl";

/** footer in every page remains same, irrespective of userType
 * */
class Footer extends React.Component {

    render() {
        return (
            <div>
                {/*<div className="white-fade">Useful Links</div>*/}
                {/*<div className="row">*/}
                    {/*<div className="col col-lg-4"><a href="#">Contact Us</a></div>*/}
                    {/*<div className="col col-lg-4"><a href="#">About Us</a></div>*/}
                {/*</div>*/}
                <div className="white-fade">
                    <p id="horizontal-line">
                        <hr/>
                    </p>
                    <p>&copy; 2017 Hebecollins.com</p>
                </div>
            </div>
        );
    }
}

export default Footer;