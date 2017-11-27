import React from 'react';
import Navigation from './others/navigation/Navigation'
import FlashMessageList from './others/flashMessage/FlashMessageList';
import Footer from "./others/frames/Footer";

require('../Toolbox/css/commons/extra.css');
require('../Toolbox/css/text.css');
require('../Toolbox/css/formFields.css');
require('../Toolbox/css/contentBox.css');
require('../Toolbox/css/images.css');
require('../Toolbox/css/dateTime.css');
require('../Toolbox/css/font-awesome.min.css');
require('../Toolbox/css/commons/animation.css');
require('../Toolbox/css/commons/autosuggestion.css');
require('../Toolbox/css/commons/buttons.css');
require('../Toolbox/css/commons/workout.css');
require('../Toolbox/css/commons/positions.css');
require('../Toolbox/css/commons/list.css');
require('../Toolbox/css/commons/dropzone.css');
require('../Toolbox/css/commons/navigationBar.css');
require('../Toolbox/css/commons/rating.css');
require('../Toolbox/css/client/getCurrentWorkout.css');
require('../Toolbox/css/admin/gif.css');
require('../Toolbox/css/test.css');
require('../Toolbox/css/commons/footer.css');


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="page">
                <div className="layer">
                    <Navigation/>
                    {/*<GuestNavigation/>*/}
                    <div id="flash-message">
                        <FlashMessageList/>
                    </div>
                        {this.props.children}
                    <div id="footer">
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;