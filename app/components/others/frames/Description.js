import React from 'react';

class Description extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col col-lg-9">
                    <div className="description">
                        <p>Wrestle with an alligator, tussel with a whale,</p>
                        <p>I handcuffed lightening.</p>
                        <p>Last week, I injured a stone, hospitalized a brick.</p>
                        <p>I am so mean that I make medicine sick.</p>
                        <p className="pull-right">- Mohammad Ali</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Description;
