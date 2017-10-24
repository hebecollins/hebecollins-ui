import React from 'react';
import QuoteBox from "../../smart/commons/templates/QuoteBox";
import {redirectByName} from "../../../Toolbox/Helpers/redirect";

class TrainerHome extends React.Component {
    render() {
        return (
            <div>
                <QuoteBox>
                    <li>
                        <button
                            className="btn-hebecollins-black"
                            onClick={() => redirectByName("ADD_CLIENT")}
                        >Add Client
                        </button>
                    </li>
                    <li>
                        <button className="btn-hebecollins-black">Add Workout</button>
                    </li>
                </QuoteBox>
            </div>
        )
    }
}

export default TrainerHome;