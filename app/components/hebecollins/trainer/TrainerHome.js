import React from 'react';
import QuoteBox from "../../smart/commons/templates/QuoteBox";

class TrainerHome extends React.Component {
    render() {
        return (
            <div>
                <QuoteBox>
                    <li><button className="btn-hebecollins-black">Add Client</button></li>
                    <li><button className="btn-hebecollins-black">Add Workout</button></li>
                </QuoteBox>
            </div>
        )
    }
}

export default TrainerHome;