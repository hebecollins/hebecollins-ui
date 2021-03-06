import React from 'react';
import QuoteBox from "../../others/frames/QuoteBox";
import {redirectByName} from "../../../Toolbox/Helpers/redirect";

class TrainerHome extends React.Component {
    render() {
        console.log("trainer home");
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
                        <button
                            className="btn-hebecollins-black"
                            onClick={() => redirectByName("CLIENT_LIST_FOR_TRAINER")}
                        >Client list
                        </button>
                    </li>
                </QuoteBox>
            </div>
        )
    }
}

export default TrainerHome;