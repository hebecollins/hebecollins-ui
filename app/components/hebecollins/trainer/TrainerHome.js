import React from 'react';
import QuoteBox from "../../others/frames/QuoteBox";
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
                        <button
                            className="btn-hebecollins-black"
                            onClick={() => redirectByName("CLIENT_LIST")}
                        >Client list
                        </button>
                    </li>
                </QuoteBox>
            </div>
        )
    }
}

export default TrainerHome;