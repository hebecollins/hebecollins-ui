import React from 'react';
import QuoteBox from "../../others/frames/QuoteBox";

class ClientHome extends React.Component {
    render() {
        return (
            <div>
                <QuoteBox>
                    <li><button className="btn-hebecollins-black">Get Workout</button></li>
                </QuoteBox>
            </div>
        )
    }
}

export default ClientHome;