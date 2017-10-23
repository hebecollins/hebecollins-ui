import React from 'react';
import {Fade} from "../../dumb/commons/animation/Animation";

class AddTrainer extends React.Component {
    render() {
        return (
            <div className="content">
                <h1 className="quote-box">
                    <Fade>
                        <div className="animation">Helllo</div>
                    </Fade>
                </h1>
            </div>
        )
    }
}

export default AddTrainer;